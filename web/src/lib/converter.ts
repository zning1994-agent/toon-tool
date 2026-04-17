// TOON: Token-Oriented Object Notation
// Spec: https://toonformat.dev/reference/spec.html
// Compact, bracket-free encoding of JSON for LLM prompts.

export type JSONValue = string | number | boolean | null | JSONValue[] | JSONObject;
export interface JSONObject { [key: string]: JSONValue }

// ============================================================================
// Shared Helpers
// ============================================================================

function isPrimitive(v: JSONValue): boolean {
  return v === null || typeof v !== "object";
}

/** Split a comma-separated string, respecting double-quoted values */
function splitCSV(s: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"' && (i === 0 || s[i - 1] !== '\\')) {
      inQuotes = !inQuotes;
      current += ch;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

// ============================================================================
// JSON -> TOON
// ============================================================================

/**
 * Returns true when the string must be double-quoted in TOON output.
 * @param inCSV - true when the value sits inside a comma-separated row
 */
function needsQuote(s: string, inCSV = false): boolean {
  if (s === "") return true;
  if (s === "null" || s === "true" || s === "false") return true;
  if (s !== s.trim()) return true;
  const n = Number(s);
  if (!isNaN(n) && String(n) === s) return true;
  if (inCSV && s.includes(",")) return true;
  if (s.includes("\n") || s.includes("\r")) return true;
  return false;
}

function renderString(s: string, inCSV = false): string {
  if (needsQuote(s, inCSV)) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return s;
}

function renderValue(val: JSONValue, inCSV = false): string {
  if (val === null) return "null";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  if (typeof val === "string") return renderString(val, inCSV);
  return JSON.stringify(val);
}

function isUniformPrimitiveArray(arr: JSONValue[]): boolean {
  return arr.length > 0 && arr.every(isPrimitive);
}

function isUniformObjectArray(arr: JSONValue[]): boolean {
  if (arr.length === 0) return false;
  if (typeof arr[0] !== "object" || arr[0] === null || Array.isArray(arr[0])) return false;
  const keys0 = Object.keys(arr[0] as JSONObject).join(",");
  return arr.every((v) => {
    if (typeof v !== "object" || v === null || Array.isArray(v)) return false;
    return Object.keys(v as JSONObject).join(",") === keys0;
  });
}

export function jsonToToon(data: JSONValue): string {
  if (data === null) return "null";
  if (typeof data === "boolean") return data ? "true" : "false";
  if (typeof data === "number") return String(data);
  if (typeof data === "string") return renderString(data);

  if (Array.isArray(data)) {
    if (data.length === 0) return "[0]:";
    if (isUniformObjectArray(data)) {
      const keys = Object.keys(data[0] as JSONObject);
      const rows = data.map((item) => {
        const obj = item as JSONObject;
        return "  " + keys.map((k) => renderValue(obj[k], true)).join(",");
      }).join("\n");
      return `[${data.length}]{${keys.join(",")}}:\n${rows}`;
    }
    if (isUniformPrimitiveArray(data)) {
      return `[${data.length}]: ${data.map((v) => renderValue(v, true)).join(",")}`;
    }
    return renderMixedArrayLines(data, 0);
  }

  // Object
  const entries = Object.entries(data as JSONObject);
  if (entries.length === 0) return "";
  return renderEntries(entries, 0);
}

function renderMixedArrayLines(arr: JSONValue[], indent: number): string {
  const pad = "  ".repeat(indent);
  return arr.map((item) => {
    if (Array.isArray(item)) {
      if (item.length === 0) return `${pad}  - [0]:`;
      const inner = item.map((v) => renderValue(v, true)).join(",");
      return `${pad}  - [${item.length}]: ${inner}`;
    }
    if (typeof item === "object" && item !== null) {
      const entries = Object.entries(item as JSONObject);
      if (entries.length === 1 && isPrimitive(entries[0][1])) {
        return `${pad}  - ${entries[0][0]}: ${renderValue(entries[0][1])}`;
      }
      const nested = renderEntries(entries, indent + 2);
      return `${pad}  -\n${nested}`;
    }
    return `${pad}  - ${renderValue(item)}`;
  }).join("\n");
}

function renderEntries(entries: [string, JSONValue][], indent: number): string {
  const pad = "  ".repeat(indent);
  return entries.map(([key, val]) => {
    if (Array.isArray(val)) {
      if (val.length === 0) return `${pad}${key}[0]:`;
      if (isUniformObjectArray(val)) {
        const keys = Object.keys(val[0] as JSONObject);
        const rows = val.map((item) => {
          const obj = item as JSONObject;
          return `${pad}  ` + keys.map((k) => renderValue(obj[k], true)).join(",");
        }).join("\n");
        return `${pad}${key}[${val.length}]{${keys.join(",")}}:\n${rows}`;
      }
      if (isUniformPrimitiveArray(val)) {
        return `${pad}${key}[${val.length}]: ${val.map((v) => renderValue(v, true)).join(",")}`;
      }
      const items = renderMixedArrayLines(val, indent);
      return `${pad}${key}[${val.length}]:\n${items}`;
    }
    if (typeof val === "object" && val !== null) {
      const nested = renderEntries(Object.entries(val as JSONObject), indent + 1);
      return `${pad}${key}:\n${nested}`;
    }
    return `${pad}${key}: ${renderValue(val)}`;
  }).join("\n");
}

// ============================================================================
// TOON -> JSON
// ============================================================================

interface LexedLine {
  raw: string;
  content: string;       // left+right trimmed
  indent: number;
  kind:
    | "kv"
    | "kv-empty"
    | "kv-tabular"
    | "kv-inline-arr"
    | "kv-root-arr"
    | "kv-root-tabular"
    | "arr-bullet"
    | "arr-nested"
    | "arr-kv"
    | "blank";
  key?: string;
  rawVal?: string;
  fields?: string[];
  size?: number;
  rowVals?: string[];
}

function lex(toon: string): LexedLine[] {
  return toon.split("\n").map((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return { raw, content: "", indent: 0, kind: "blank" as const };

    const indent = raw.search(/\S/);
    const content = trimmed;

    // Bullet: - value  (must come before key[N] matchers so "- [2]: 1,2" is not mis-lexed)
    if (/^-\s/.test(content) || content === "-") {
      const rest = content.length > 1 ? content.slice(1).trim() : "";
      const nestedArrMatch = rest.match(/^\[(\d+)\]:\s*(.*)$/);
      if (nestedArrMatch) {
        const size = parseInt(nestedArrMatch[1], 10);
        const restVal = nestedArrMatch[2].trim();
        const vals = restVal ? splitCSV(restVal) : [];
        return { raw, content, indent, kind: "arr-nested" as const, size, rowVals: vals };
      }
      if (!rest) {
        return { raw, content, indent, kind: "arr-bullet" as const, rawVal: "" };
      }
      if (rest.includes(":")) {
        return { raw, content, indent, kind: "arr-kv" as const, rawVal: rest };
      }
      return { raw, content, indent, kind: "arr-bullet" as const, rawVal: rest };
    }

    // Root tabular: [N]{f1,f2,...}:
    const rootTabMatch = content.match(/^\[(\d+)\]\{(.+?)\}:\s*$/);
    if (rootTabMatch) {
      const size = parseInt(rootTabMatch[1], 10);
      const fields = rootTabMatch[2].split(",").map((s) => s.trim());
      return { raw, content, indent, kind: "kv-root-tabular" as const, size, fields };
    }

    // Root array: [N]: items
    const rootArrMatch = content.match(/^\[(\d+)\]:\s*(.*)$/);
    if (rootArrMatch) {
      const size = parseInt(rootArrMatch[1], 10);
      const rest = rootArrMatch[2].trim();
      if (rest) {
        const vals = splitCSV(rest);
        return { raw, content, indent, kind: "kv-root-arr" as const, size, rawVal: rest, rowVals: vals };
      }
      return { raw, content, indent, kind: "kv-root-arr" as const, size, rawVal: "" };
    }

    // Tabular array: key[N]{f1,f2,...}:
    const tabularMatch = content.match(/^(.+?)\[(\d+)\]\{(.+?)\}:\s*$/);
    if (tabularMatch) {
      const key = tabularMatch[1].trim();
      const size = parseInt(tabularMatch[2], 10);
      const fields = tabularMatch[3].split(",").map((s) => s.trim());
      return { raw, content, indent, kind: "kv-tabular" as const, key, size, fields };
    }

    // Inline array: key[N]: values
    const inlineArrMatch = content.match(/^(.+?)\[(\d+)\]:\s*(.*)$/);
    if (inlineArrMatch) {
      const key = inlineArrMatch[1].trim();
      const size = parseInt(inlineArrMatch[2], 10);
      const rest = inlineArrMatch[3].trim();
      if (rest) {
        const vals = splitCSV(rest);
        return { raw, content, indent, kind: "kv-inline-arr" as const, key, size, rawVal: rest, rowVals: vals };
      }
      return { raw, content, indent, kind: "kv-inline-arr" as const, key, size, rawVal: "" };
    }

    // key: value (or key-empty)
    const colonIdx = content.indexOf(":");
    if (colonIdx !== -1) {
      const key = content.slice(0, colonIdx).trim();
      const rawVal = content.slice(colonIdx + 1);
      if (rawVal.trim() === "") {
        return { raw, content, indent, kind: "kv-empty" as const, key };
      }
      return { raw, content, indent, kind: "kv" as const, key, rawVal: rawVal.trim() };
    }

    // Bare token (no colon) — could be a tabular data row
    return { raw, content, indent, kind: "kv" as const, key: content, rawVal: "" };
  });
}

function parsePrimitive(raw: string): JSONValue {
  const s = raw.trim();
  if (s === "") return "";
  if (s === "null") return null;
  if (s === "true") return true;
  if (s === "false") return false;
  if (s.startsWith('"') && s.endsWith('"') && s.length >= 2) {
    // Unescape TOON string escapes: \\ → \ first, then \" → "
    return s.slice(1, -1).replace(/\\\\/g, '\\').replace(/\\"/g, '"');
  }
  const n = Number(s);
  if (!isNaN(n) && String(n) === s) return n;
  return s;
}

export function toonToJson(toon: string): JSONValue {
  const trimmed = toon.trim();
  if (!trimmed) return {};

  const lines = lex(trimmed);

  // Root tabular array: [N]{f1,f2,...}:\n  rows...
  if (lines[0]?.kind === "kv-root-tabular") {
    const fields = lines[0].fields!;
    const size = lines[0].size!;
    const items: JSONObject[] = [];
    for (let i = 1; i < lines.length && items.length < size; i++) {
      if (lines[i].kind === "blank") continue;
      const vals = splitCSV(lines[i].content);
      if (vals.length === fields.length) {
        const obj: JSONObject = {};
        fields.forEach((f, idx) => { obj[f] = parsePrimitive(vals[idx]); });
        items.push(obj);
      }
    }
    return items;
  }

  // Root inline primitive array: [N]: a,b,c
  if (lines[0]?.kind === "kv-root-arr") {
    if (lines[0].rowVals && lines[0].rowVals.length > 0) {
      return lines[0].rowVals.map(parsePrimitive);
    }
    // [0]: → empty array
    if (lines[0].size === 0) return [];
    // [N]: followed by bullet items
    const arr: JSONValue[] = [];
    parseBulletItems(lines, 1, -1, arr);
    return arr;
  }

  // Root starts with bullets → root array
  if (lines[0]?.kind === "arr-bullet" || lines[0]?.kind === "arr-nested" || lines[0]?.kind === "arr-kv") {
    const arr: JSONValue[] = [];
    parseBulletItems(lines, 0, -1, arr);
    return arr;
  }

  const { value } = parseBlock(lines, 0, 0);
  return value;
}

/** Collect bullet items (- ...) into `arr`, starting at `start`. Stops at dedent. Returns next index. */
function parseBulletItems(lines: LexedLine[], start: number, parentIndent: number, arr: JSONValue[]): number {
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    if (line.kind === "blank") { i++; continue; }
    if (parentIndent >= 0 && line.indent <= parentIndent) break;

    if (line.kind === "arr-bullet") {
      if (line.rawVal === "") {
        // Bare bullet: check for nested object on next lines
        const next = lines[i + 1];
        if (next && next.indent > line.indent) {
          const nested = parseBlock(lines, i + 1, next.indent);
          arr.push(nested.value);
          i = i + 1 + nested.consumed;
        } else {
          arr.push("");
          i++;
        }
      } else {
        arr.push(parsePrimitive(line.rawVal!));
        i++;
      }
    } else if (line.kind === "arr-nested") {
      const vals = line.rowVals ?? [];
      arr.push(vals.map(parsePrimitive));
      i++;
    } else if (line.kind === "arr-kv") {
      const colonIdx = line.rawVal!.indexOf(":");
      const k = line.rawVal!.slice(0, colonIdx).trim();
      const v = line.rawVal!.slice(colonIdx + 1).trim();
      // Check if more kv pairs follow at deeper indent for a multi-key object
      const next = lines[i + 1];
      if (next && next.indent > line.indent && (next.kind === "kv" || next.kind === "kv-empty")) {
        const obj: JSONObject = { [k]: parsePrimitive(v) };
        i++;
        while (i < lines.length) {
          const sub = lines[i];
          if (sub.kind === "blank") { i++; continue; }
          if (sub.indent <= line.indent) break;
          if (sub.kind === "kv") {
            obj[sub.key!] = parsePrimitive(sub.rawVal ?? "");
            i++;
          } else if (sub.kind === "kv-empty") {
            const subNext = lines[i + 1];
            if (subNext && subNext.indent > sub.indent) {
              const nested = parseBlock(lines, i + 1, subNext.indent);
              obj[sub.key!] = nested.value;
              i = i + 1 + nested.consumed;
            } else {
              obj[sub.key!] = null;
              i++;
            }
          } else {
            break;
          }
        }
        arr.push(obj);
      } else {
        arr.push({ [k]: parsePrimitive(v) });
        i++;
      }
    } else {
      break;
    }
  }
  return i;
}

function parseBlock(lines: LexedLine[], start: number, currentIndent: number): { value: JSONValue; consumed: number } {
  const result: JSONObject = {};
  let i = start;

  while (i < lines.length) {
    const line = lines[i];
    if (line.kind === "blank") { i++; continue; }
    if (line.indent < currentIndent) break;

    // Tabular array: key[N]{f1,f2,...}:
    if (line.kind === "kv-tabular") {
      const key = line.key!;
      const fields = line.fields!;
      const size = line.size!;
      const items: JSONObject[] = [];
      const headerIndent = line.indent;
      i++;
      while (items.length < size && i < lines.length) {
        const rowLine = lines[i];
        if (rowLine.kind === "blank") { i++; continue; }
        if (rowLine.indent <= headerIndent) break;
        const vals = splitCSV(rowLine.content);
        if (vals.length === fields.length) {
          const obj: JSONObject = {};
          fields.forEach((f, idx) => { obj[f] = parsePrimitive(vals[idx]); });
          items.push(obj);
        }
        i++;
      }
      result[key] = items;
      continue;
    }

    // Inline array: key[N]: a,b,c
    if (line.kind === "kv-inline-arr") {
      const key = line.key!;
      if (line.rawVal === "") {
        // key[N]: with no inline values — look for bullet items below
        const next = lines[i + 1];
        if (next && next.indent > line.indent &&
            (next.kind === "arr-bullet" || next.kind === "arr-nested" || next.kind === "arr-kv")) {
          const arr: JSONValue[] = [];
          const end = parseBulletItems(lines, i + 1, line.indent, arr);
          result[key] = arr;
          i = end;
        } else {
          result[key] = [];
          i++;
        }
        continue;
      }
      result[key] = (line.rowVals ?? []).map(parsePrimitive);
      i++;
      continue;
    }

    // Empty value key: — could be nested object, array, or null
    if (line.kind === "kv-empty") {
      const next = lines[i + 1];
      if (next && next.indent > line.indent) {
        // Check if children are bullet items → array
        if (next.kind === "arr-bullet" || next.kind === "arr-nested" || next.kind === "arr-kv") {
          const arr: JSONValue[] = [];
          const end = parseBulletItems(lines, i + 1, line.indent, arr);
          result[line.key!] = arr;
          i = end;
        } else {
          const nested = parseBlock(lines, i + 1, next.indent);
          result[line.key!] = nested.value;
          i = i + 1 + nested.consumed;
        }
      } else {
        result[line.key!] = null;
        i++;
      }
      continue;
    }

    // Simple kv
    if (line.kind === "kv") {
      const key = line.key!;
      const rawVal = line.rawVal ?? "";
      // If rawVal is empty, could be a nested object on next line
      if (rawVal === "") {
        const next = lines[i + 1];
        if (next && next.indent > line.indent) {
          const nested = parseBlock(lines, i + 1, next.indent);
          result[key] = nested.value;
          i = i + 1 + nested.consumed;
          continue;
        }
      }
      result[key] = parsePrimitive(rawVal);
      i++;
      continue;
    }

    // Bullets at block level → this block is actually an array
    if (line.kind === "arr-bullet" || line.kind === "arr-nested" || line.kind === "arr-kv") {
      const arr: JSONValue[] = [];
      i = parseBulletItems(lines, i, currentIndent > 0 ? currentIndent - 1 : -1, arr);
      return { value: arr, consumed: i - start };
    }

    i++;
  }

  return { value: Object.keys(result).length > 0 ? result : {}, consumed: i - start };
}

// ============================================================================
// Validation
// ============================================================================

export function validateJson(data: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  try {
    JSON.parse(data);
  } catch (e) {
    errors.push(String(e));
  }
  return { valid: errors.length === 0, errors };
}

export function validateToon(toon: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  try {
    const result = toonToJson(toon);
    if (result === undefined) errors.push("Failed to parse TOON — check indentation and syntax");
  } catch (e) {
    errors.push(String(e));
  }
  return { valid: errors.length === 0, errors };
}
