"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState, useCallback } from "react";
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

// ── Schema parser ─────────────────────────────────────────────────────

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
      const keyMatch = content.match(/^(\w+)\s*:/);
      if (typeMatch) {
        const key = typeMatch[1];
        const rest = content.slice(key.length + 1).trim();

        if (key === "type") {
          rule.type = rest.replace(/["']/g, "");
        } else if (key === "required") {
          rule.required = rest === "true";
        } else if (key === "min") {
          rule.min = parseFloat(rest);
        } else if (key === "max") {
          rule.max = parseFloat(rest);
        } else if (key === "pattern") {
          rule.pattern = rest.replace(/^["']|["']$/g, "");
        } else if (key === "enum") {
          rule.enum = rest.replace(/^\[/, "").replace(/\]$/, "").split(",").map((s) => {
            s = s.trim().replace(/^["']|["']$/g, "");
            if (s === "true") return true;
            if (s === "false") return false;
            if (s === "null") return null;
            if (!isNaN(Number(s))) return Number(s);
            return s;
          });
        } else if (key === "minItems") {
          rule.minItems = parseInt(rest, 10);
        } else if (key === "maxItems") {
          rule.maxItems = parseInt(rest, 10);
        } else if (rest === "{") {
          i++;
          rule.properties = {};
          const innerIndent = lineIndent + 2;
          const innerRules = parseBlock(innerIndent);
          rule.properties = innerRules;
        } else if (rest === "[") {
          i++;
          rule.items = parseRule(lineIndent + 2);
        } else {
          // unknown key — treat as field
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

// ── Validation ─────────────────────────────────────────────────────────

interface ValidationError {
  path: string;
  message: string;
  line: number;
}

function validateValue(value: JSONValue, rule: SchemaRule | undefined, path: string, lines: string[]): ValidationError[] {
  const errors: ValidationError[] = [];

  if (rule === undefined) return errors;

  if (rule.type) {
    const actualType = Array.isArray(value) ? "array"
      : value === null ? "null"
      : typeof value;
    if (actualType !== rule.type && !(rule.type === "number" && typeof value === "number")) {
      errors.push({ path, message: `Expected ${rule.type}, got ${actualType}`, line: 1 });
    }
  }

  if (rule.min !== undefined && typeof value === "number" && value < rule.min) {
    errors.push({ path, message: `Value ${value} is less than minimum ${rule.min}`, line: 1 });
  }
  if (rule.max !== undefined && typeof value === "number" && value > rule.max) {
    errors.push({ path, message: `Value ${value} exceeds maximum ${rule.max}`, line: 1 });
  }

  if (rule.enum && !rule.enum.includes(value)) {
    errors.push({ path, message: `Value must be one of [${rule.enum.join(", ")}]`, line: 1 });
  }

  if (rule.minItems !== undefined && Array.isArray(value) && value.length < rule.minItems) {
    errors.push({ path, message: `Array has ${value.length} items, minimum is ${rule.minItems}`, line: 1 });
  }
  if (rule.maxItems !== undefined && Array.isArray(value) && value.length > rule.maxItems) {
    errors.push({ path, message: `Array has ${value.length} items, maximum is ${rule.maxItems}`, line: 1 });
  }

  if (rule.properties && typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value as JSONObject;
    for (const [key, fieldRule] of Object.entries(rule.properties)) {
      if (fieldRule.required && !(key in obj)) {
        errors.push({ path: `${path}.${key}`, message: `Missing required field "${key}"`, line: 1 });
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

// ── TOON → JSON ──────────────────────────────────────────────────────

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
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  return s;
}

function parseBlock(lines: LexedLine[], start: number, currentIndent: number): { value: JSONValue; consumed: number } {
  let i = start;
  const obj: JSONObject = {};
  const arr: JSONValue[] = [];

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
      const expectedSize = fields.length;
      const innerIndent = line.indent + 2;
      i++;
      while (i < lines.length && lines[i].indent >= innerIndent) {
        if (lines[i].kind === "tabular") {
          const rowVals = lines[i].rowVals!;
          if (rowVals.length === expectedSize) {
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

  return { value: Object.keys(obj).length > 0 ? obj : (arr.length > 0 ? arr : {}), consumed: i - start };
}

function toonToJson(toon: string): JSONValue {
  const lines = lex(toon);
  const { value } = parseBlock(lines, 0, 0);
  return value;
}

// ── UI ───────────────────────────────────────────────────────────────

const SAMPLE_SCHEMA = `# TOON Schema — GitHub Repo
type: object
required:
  name: string
  stars: number
  fork: boolean
url:
  type: string
  pattern: "^https://"
description:
  type: string
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

const SAMPLE_TOON = `# GitHub repo
name: toon-tool
url: https://github.com/zning1994-agent/toon-tool
stars: 42
fork: true
languages:
  JavaScript, TypeScript, Python
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
  const [mode, setMode] = useState<"schema" | "table">("schema");

  const validate = useCallback(() => {
    try {
      const schema = parseSchema(schemaText.split("\n"));
      const instance = toonToJson(instanceText);
      const allErrors: ValidationError[] = [];
      for (const [key, rule] of Object.entries(schema)) {
        if (rule.required && !(key in (instance as JSONObject))) {
          allErrors.push({ path: key, message: `Missing required field "${key}"`, line: 1 });
        }
        if (key in (instance as JSONObject)) {
          allErrors.push(...validateValue((instance as JSONObject)[key], rule, key, instanceText.split("\n")));
        }
      }
      setErrors(allErrors);
    } catch (e: unknown) {
      setErrors([{ path: "", message: e instanceof Error ? e.message : String(e), line: 1 }]);
    }
  }, [schemaText, instanceText]);

  // Live validate
  useState(() => {
    const t = setTimeout(validate, 300);
    return () => clearTimeout(t);
  });

  return (
    <ToolLayout>
      <div className="min-h-screen bg-[#0d1117] text-gray-200 font-mono">
        {/* Header */}

        {/* Errors banner */}
        {errors.length > 0 && (
          <div className="border-b border-red-900/50 bg-red-950/30 px-6 py-3">
            <div className="text-xs text-red-400 font-semibold mb-1">✗ {errors.length} validation error{errors.length > 1 ? "s" : ""}</div>
            {errors.slice(0, 5).map((err, idx) => (
              <div key={idx} className="text-xs text-red-300/80 font-mono ml-2">
                {err.path ? `• ${err.path}: ` : ""}{err.message}
              </div>
            ))}
            {errors.length > 5 && (
              <div className="text-xs text-red-400/60 mt-1">...and {errors.length - 5} more</div>
            )}
          </div>
        )}
        {errors.length === 0 && schemaText.trim() && instanceText.trim() && (
          <div className="border-b border-green-900/50 bg-green-950/30 px-6 py-2">
            <span className="text-xs text-green-400">✓ All checks passed — instance matches schema</span>
          </div>
        )}

        {/* Split editor */}
        <div className="flex" style={{ height: "calc(100vh - 160px)" }}>
          {/* Left: Schema */}
          <div className="flex-1 flex flex-col border-r border-[#30363d]">
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-[#21262d] bg-[#161b22] flex items-center justify-between">
              <span>Schema Definition</span>
              <span className="text-[#484f58] text-[10px]">TOON-like format</span>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-12 bg-[#161b22] border-r border-[#21262d] text-right pr-2 pt-3 text-xs text-[#484f58] leading-6 select-none overflow-hidden">
                {schemaLines.map((n) => <div key={n}>{n}</div>)}
              </div>
              <textarea
                value={schemaText}
                onChange={(e) => {
                  setSchemaText(e.target.value);
                  setSchemaLines(lineNumbers(e.target.value.split("\n").length));
                }}
                className="flex-1 bg-[#0d1117] text-yellow-300 p-3 text-sm leading-6 resize-none outline-none font-mono"
                spellCheck={false}
                placeholder="name: string&#10;age: number&#10;required:&#10;  name: string"
                style={{ tabSize: 2 }}
              />
            </div>
          </div>

          {/* Right: Instance */}
          <div className="flex-1 flex flex-col">
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-[#21262d] bg-[#161b22] flex items-center justify-between">
              <span>Instance (TOON Data)</span>
              <span className="text-[#484f58] text-[10px]">.toon</span>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-12 bg-[#161b22] border-r border-[#21262d] text-right pr-2 pt-3 text-xs text-[#484f58] leading-6 select-none overflow-hidden">
                {instanceLines.map((n) => <div key={n}>{n}</div>)}
              </div>
              <textarea
                value={instanceText}
                onChange={(e) => {
                  setInstanceText(e.target.value);
                  setInstanceLines(lineNumbers(e.target.value.split("\n").length));
                }}
                className="flex-1 bg-[#0d1117] text-gray-200 p-3 text-sm leading-6 resize-none outline-none font-mono"
                spellCheck={false}
                placeholder="name: test&#10;age: 25"
                style={{ tabSize: 2 }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#30363d] px-6 py-3 flex items-center justify-between text-xs text-gray-500">
          <span>TOON Schema Validator</span>
          <span>Build {BUILD_DATE}</span>
        </footer>
      </div>
    </ToolLayout>
  );
}
