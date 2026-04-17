"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState, useEffect, useCallback } from "react";
import { BUILD_DATE } from "@/lib/constants";

/* ── TOON Schema Validator ─────────────────────────────────────────── */

type JSONValue = string | number | boolean | null | JSONValue[] | JSONObject;
interface JSONObject { [key: string]: JSONValue }

interface SchemaRule {
  type?: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  enum?: JSONValue[];
  properties?: Record<string, SchemaRule>;
  items?: SchemaRule;
  minItems?: number;
  maxItems?: number;
}

type SchemaMap = Record<string, SchemaRule>;

function parseSchema(lines: string[]): SchemaMap {
  const schema: SchemaMap = {};
  let i = 0;

  function skipEmpty() {
    while (i < lines.length && !lines[i].trim()) i++;
  }

  function parseRule(indent: number): SchemaRule {
    const rule: SchemaRule = {};
    while (i < lines.length) {
      const line = lines[i];
      const lineIndent = line.search(/\S/);
      if (lineIndent < indent && line.trim()) { i--; break; }
      if (!line.trim()) { i++; continue; }
      const content = line.trim();

      if (content === "}") { i++; break; }

      const typeMatch = content.match(/^(\w+)\s*:/);
      if (typeMatch) {
        const key = typeMatch[1];
        const rest = content.slice(key.length + 1).trim();

        if (key === "type") rule.type = rest.replace(/["']/g, "");
        else if (key === "required") rule.required = rest === "true";
        else if (key === "min") rule.min = parseFloat(rest);
        else if (key === "max") rule.max = parseFloat(rest);
        else if (key === "pattern") rule.pattern = rest.replace(/^["']|["']$/g, "");
        else if (key === "enum") {
          rule.enum = rest.replace(/^\[/, "").replace(/\]$/, "").split(",").map((s) => {
            s = s.trim().replace(/^["']|["']$/g, "");
            if (s === "true") return true;
            if (s === "false") return false;
            if (s === "null") return null;
            if (!isNaN(Number(s))) return Number(s);
            return s;
          });
        } else if (key === "minItems") rule.minItems = parseInt(rest, 10);
        else if (key === "maxItems") rule.maxItems = parseInt(rest, 10);
        else if (rest === "{") {
          i++;
          rule.properties = {};
          const innerRules = parseBlock(lineIndent + 2);
          rule.properties = innerRules;
        } else if (rest === "[") {
          i++;
          rule.items = parseRule(lineIndent + 2);
        } else {
          i++;
        }
      } else {
        i++;
      }
    }
    return rule;
  }

  function parseBlock(indent: number): Record<string, SchemaRule> {
    const block: Record<string, SchemaRule> = {};
    skipEmpty();
    while (i < lines.length) {
      const line = lines[i];
      const lineIndent = line.search(/\S/);
      if (lineIndent < indent) break;
      if (!line.trim()) { i++; continue; }
      const content = line.trim();

      const kvMatch = content.match(/^(\w+)\s*:\s*(.*)/);
      if (kvMatch) {
        const fieldName = kvMatch[1];
        const rest = kvMatch[2].trim();
        i++;

        if (rest === "{") {
          const innerIndent = line.search(/\S/) + 2;
          const innerRules = parseBlock(innerIndent);
          block[fieldName] = { properties: innerRules };
        } else if (rest === "[") {
          block[fieldName] = parseRule(line.search(/\S/) + 2);
        } else {
          const rule: SchemaRule = {};
          if (rest === "string") rule.type = "string";
          else if (rest === "number") rule.type = "number";
          else if (rest === "boolean") rule.type = "boolean";
          else if (rest === "null") rule.type = "null";
          else if (rest === "array") rule.type = "array";
          else if (rest === "object") rule.type = "object";
          else rule.type = rest.replace(/["']/g, "");
          block[fieldName] = rule;
        }
      } else {
        i++;
      }
    }
    return block;
  }

  skipEmpty();
  parseBlock(0);
  return schema;
}

interface ValidationError {
  path: string;
  message: string;
}

function validateValue(value: JSONValue, rule: SchemaRule | undefined, path: string, lines: string[]): ValidationError[] {
  const errors: ValidationError[] = [];
  if (rule === undefined) return errors;

  if (rule.type) {
    const actualType = Array.isArray(value) ? "array"
      : value === null ? "null"
      : typeof value;
    if (actualType !== rule.type && !(rule.type === "number" && typeof value === "number")) {
      errors.push({ path, message: `Expected ${rule.type}, got ${actualType}` });
    }
  }

  if (rule.min !== undefined && typeof value === "number" && value < rule.min) {
    errors.push({ path, message: `Value ${value} is less than minimum ${rule.min}` });
  }
  if (rule.max !== undefined && typeof value === "number" && value > rule.max) {
    errors.push({ path, message: `Value ${value} exceeds maximum ${rule.max}` });
  }

  if (rule.enum && !rule.enum.includes(value)) {
    errors.push({ path, message: `Value must be one of [${rule.enum.join(", ")}]` });
  }

  if (rule.minItems !== undefined && Array.isArray(value) && value.length < rule.minItems) {
    errors.push({ path, message: `Array has ${value.length} items, minimum is ${rule.minItems}` });
  }
  if (rule.maxItems !== undefined && Array.isArray(value) && value.length > rule.maxItems) {
    errors.push({ path, message: `Array has ${value.length} items, maximum is ${rule.maxItems}` });
  }

  if (rule.properties && typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value as JSONObject;
    for (const [key, fieldRule] of Object.entries(rule.properties)) {
      if (fieldRule.required && !(key in obj)) {
        errors.push({ path: `${path}.${key}`, message: `Missing required field "${key}"` });
      }
      if (key in obj) {
        errors.push(...validateValue(obj[key], fieldRule, `${path}.${key}`, lines));
      }
    }
  }

  if (rule.items && Array.isArray(value)) {
    value.forEach((item, idx) => {
      errors.push(...validateValue(item, rule.items, `${path}[${idx}]`, lines));
    });
  }

  return errors;
}

/* ── TOON → JSON (minimal parser for schema page) ── */
interface LexedLine {
  raw: string; content: string; indent: number; kind: string;
  key?: string; fields?: string[]; rowVals?: string[]; size?: number;
}

function lex(toon: string): LexedLine[] {
  return toon.split("\n").map((raw) => {
    const match = raw.match(/^(\s*)(.*)/)!;
    const indent = match[1].length;
    const content = match[2];
    const rootTabMatch = content.match(/^(\S+)\s*:\s*(\S[\s\S]*)$/);
    const sizeMatch = content.match(/^(\S+)\[(\d+)\]\s*:\s*(.*)$/);

    let kind = "unknown";
    let key: string | undefined;
    let fields: string[] | undefined;
    let rowVals: string[] | undefined;
    let size: number | undefined;

    if (sizeMatch) {
      kind = "sized"; key = sizeMatch[1]; size = parseInt(sizeMatch[2], 10);
      rowVals = sizeMatch[3].split(",").map((s) => s.trim());
    } else if (rootTabMatch) {
      kind = rootTabMatch[2].includes(",") ? "tabular" : "rootKV";
      key = rootTabMatch[1];
      if (kind === "tabular") fields = rootTabMatch[2].split(",").map((s) => s.trim());
    }

    return { raw, content, indent, kind, key, fields, rowVals, size };
  });
}

function parsePrimitive(raw: string): JSONValue {
  const s = raw.trim();
  if (s === "null") return null;
  if (s === "true") return true;
  if (s === "false") return false;
  if (!isNaN(Number(s)) && s !== "") return Number(s);
  if (s.startsWith('"') && s.endsWith('"') && s.length >= 2) {
    return s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  return s;
}

function parseBlock(lines: LexedLine[], start: number, currentIndent: number): { value: JSONValue; consumed: number } {
  let i = start;
  const obj: JSONObject = {};

  while (i < lines.length) {
    const line = lines[i];
    if (!line.raw.trim() || line.content === "") { i++; continue; }
    if (line.indent < currentIndent) break;

    if (line.kind === "rootKV" || line.kind === "kv") {
      const key = line.key!;
      const rawVal = line.content.match(/^[^:]+:\s*(.*)$/)?.[1] ?? "";
      obj[key] = parsePrimitive(rawVal);
      i++;
    } else if (line.kind === "sized") {
      const key = line.key!;
      obj[key] = line.rowVals!.map(parsePrimitive);
      i++;
    } else if (line.kind === "tabular") {
      const key = line.key!;
      const fields = line.fields!;
      const rows: JSONObject[] = [];
      const innerIndent = line.indent + 2;
      i++;
      while (i < lines.length && lines[i].indent >= innerIndent) {
        if (lines[i].kind === "tabular") {
          const rowVals = lines[i].rowVals!;
          if (rowVals.length === fields.length) {
            const row: JSONObject = {};
            fields.forEach((f, idx) => { row[f] = parsePrimitive(rowVals[idx]); });
            rows.push(row);
          }
        }
        i++;
      }
      obj[key] = rows;
    } else {
      i++;
    }
  }

  return { value: obj, consumed: i - start };
}

function toonToJson(toon: string): JSONValue {
  const { value } = parseBlock(lex(toon), 0, 0);
  return value;
}

/* ── UI ─────────────────────────────────────────────────────────────── */

const SAMPLE_SCHEMA = `# TOON Schema — GitHub Repo
name: string
stars: number
fork: boolean
url: string
languages:
  type: array
  items:
    type: string
config:
  type: object
  properties:
    port:
      type: number
      min: 1
      max: 65535
    debug:
      type: boolean`;

const SAMPLE_TOON = `name: toon-tool
url: https://github.com/zning1994-agent/toon-tool
stars: 42
fork: true
languages[3]: JavaScript,TypeScript,Python
config:
  port: 3000
  debug: true`;

function lineNumbers(n: number) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export default function SchemaPage() {
  const [schemaText, setSchemaText] = useState(SAMPLE_SCHEMA);
  const [instanceText, setInstanceText] = useState(SAMPLE_TOON);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [schemaLines, setSchemaLines] = useState(lineNumbers(SAMPLE_SCHEMA.split("\n").length));
  const [instanceLines, setInstanceLines] = useState(lineNumbers(SAMPLE_TOON.split("\n").length));

  const validate = useCallback(() => {
    try {
      const schema = parseSchema(schemaText.split("\n"));
      const instance = toonToJson(instanceText);
      const allErrors: ValidationError[] = [];
      for (const [key, rule] of Object.entries(schema)) {
        if (rule.required && !(key in (instance as JSONObject))) {
          allErrors.push({ path: key, message: `Missing required field "${key}"` });
        }
        if (key in (instance as JSONObject)) {
          allErrors.push(...validateValue((instance as JSONObject)[key], rule, key, instanceText.split("\n")));
        }
      }
      setErrors(allErrors);
    } catch (e: unknown) {
      setErrors([{ path: "", message: e instanceof Error ? e.message : String(e) }]);
    }
  }, [schemaText, instanceText]);

  useEffect(() => {
    const t = setTimeout(validate, 300);
    return () => clearTimeout(t);
  }, [validate]);

  const hasInput = schemaText.trim() && instanceText.trim();

  return (
    <ToolLayout>
      <div className="tool-shell">
        <section className="tool-hero">
          <h1>TOON Schema Validator</h1>
          <p>
            Declare a lightweight schema in TOON-style syntax and validate your
            document against it — type checks, ranges, enums, required fields and
            array bounds.
          </p>
        </section>

        <div className="tool-card">
          <div className="tool-toolbar">
            {hasInput && errors.length === 0 && (
              <span className="tool-badge ok">✓ Matches schema</span>
            )}
            {hasInput && errors.length > 0 && (
              <span className="tool-badge err">
                ✗ {errors.length} error{errors.length > 1 ? "s" : ""}
              </span>
            )}
            <div className="spacer" />
            <span className="meta">
              schema {schemaLines.length} · instance {instanceLines.length} lines
            </span>
          </div>

          <div className="tool-split">
            <div className="tool-panel">
              <div className="tool-panel-header">
                <span>Schema definition</span>
                <span className="hint">TOON-like rules</span>
              </div>
              <div className="tool-editor">
                <div className="tool-line-numbers" aria-hidden="true">
                  {schemaLines.map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>
                <textarea
                  value={schemaText}
                  onChange={(e) => {
                    setSchemaText(e.target.value);
                    setSchemaLines(lineNumbers(e.target.value.split("\n").length));
                  }}
                  className="tool-textarea"
                  spellCheck={false}
                  placeholder={"name: string\nage: number"}
                  style={{ tabSize: 2 }}
                  aria-label="Schema definition"
                />
              </div>
            </div>

            <div className="tool-panel">
              <div className="tool-panel-header">
                <span>Instance (TOON data)</span>
                <span className="hint">.toon</span>
              </div>
              <div className="tool-editor">
                <div className="tool-line-numbers" aria-hidden="true">
                  {instanceLines.map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>
                <textarea
                  value={instanceText}
                  onChange={(e) => {
                    setInstanceText(e.target.value);
                    setInstanceLines(lineNumbers(e.target.value.split("\n").length));
                  }}
                  className="tool-textarea"
                  spellCheck={false}
                  placeholder={"name: test\nage: 25"}
                  style={{ tabSize: 2 }}
                  aria-label="Instance data"
                />
              </div>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="tool-issue-list">
              {errors.map((err, idx) => (
                <div key={idx} className="tool-issue err">
                  <span className="tool-issue-icon">✗</span>
                  <div className="tool-issue-body">
                    <div className="tool-issue-msg">{err.message}</div>
                    {err.path && <div className="tool-issue-loc">at {err.path}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="tool-footer">
        <span>TOON Schema Validator</span>
        <span className="sep">·</span>
        <a
          href="https://github.com/zning1994-agent/toon-tool"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span className="sep">·</span>
        <span>Last updated: {BUILD_DATE}</span>
      </footer>
    </ToolLayout>
  );
}
