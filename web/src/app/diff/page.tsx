"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState, useCallback } from "react";
import { BUILD_DATE } from "@/lib/constants";

/* ── Shared types ── */
type JSONValue = string | number | boolean | null | JSONValue[] | JSONObject;
interface JSONObject { [key: string]: JSONValue }

/* ── TOON → JSON ── */
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
    let kind: string = "unknown";
    let key: string | undefined;
    let fields: string[] | undefined;
    let rowVals: string[] | undefined;
    let size: number | undefined;
    if (sizeMatch) { kind = "sized"; key = sizeMatch[1]; size = parseInt(sizeMatch[2], 10); rowVals = sizeMatch[3].split(",").map((s) => s.trim()); }
    else if (rootTabMatch) { kind = rootTabMatch[2].includes(",") ? "tabular" : "rootKV"; key = rootTabMatch[1]; if (kind === "tabular") fields = rootTabMatch[2].split(",").map((s) => s.trim()); }
    return { raw, content, indent, kind, key: key as string, fields, rowVals, size };
  });
}

function parsePrimitive(raw: string): JSONValue {
  const s = raw.trim();
  if (s === "null") return null;
  if (s === "true") return true;
  if (s === "false") return false;
  if (!isNaN(Number(s)) && s !== "") return Number(s);
  if ((s.startsWith('"') && s.endsWith('"'))) return s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  return s;
}

function parseBlock(lines: LexedLine[], start: number, currentIndent: number): { value: JSONValue; consumed: number } {
  let i = start; const obj: JSONObject = {};
  while (i < lines.length) {
    const line = lines[i];
    if (!line.raw.trim() || line.content === "") { i++; continue; }
    if (line.indent < currentIndent) break;
    if (line.kind === "rootKV" || line.kind === "kv") {
      const rawVal = line.content.match(/^[^:]+:\s*(.*)$/)?.[1] ?? "";
      obj[line.key as string] = parsePrimitive(rawVal); i++;
    } else if (line.kind === "sized") {
      const rvs = line.rowVals as string[];
      obj[line.key as string] = rvs.map(parsePrimitive); i++;
    } else if (line.kind === "tabular") {
      const flds = line.fields as string[];
      const rows: JSONObject[] = []; const innerIndent = line.indent + 2; i++;
      while (i < lines.length && lines[i].indent >= innerIndent) {
        const childLine = lines[i];
        if (childLine.kind === "tabular") {
          const childRVs = childLine.rowVals as string[];
          if (childRVs.length === flds.length) {
            const row: JSONObject = {}; flds.forEach((f, idx) => { row[f] = parsePrimitive(childRVs[idx]); }); rows.push(row);
          }
        }
        i++;
      }
      obj[line.key as string] = rows;
    } else { i++; }
  }
  return { value: Object.keys(obj).length > 0 ? obj : {}, consumed: i - start };
}

function toonToJson(toon: string): JSONValue {
  const { value } = parseBlock(lex(toon), 0, 0);
  return value;
}

/* ── Deep Diff ── */
type ChangeKind = "added" | "removed" | "changed" | "unchanged";

interface DiffEntry {
  path: string;
  kind: ChangeKind;
  leftVal?: JSONValue;
  rightVal?: JSONValue;
  leftLine?: number;
  rightLine?: number;
}

function deepDiff(left: JSONValue, right: JSONValue, path = ""): DiffEntry[] {
  const entries: DiffEntry[] = [];
  if (typeof left !== typeof right || left === null || right === null && typeof left !== typeof right) {
    entries.push({ path: path || "(root)", kind: "changed", leftVal: left, rightVal: right });
    return entries;
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLen = Math.max(left.length, right.length);
    for (let i = 0; i < maxLen; i++) {
      if (i >= left.length) entries.push({ path: `${path}[${i}]`, kind: "added", rightVal: right[i] });
      else if (i >= right.length) entries.push({ path: `${path}[${i}]`, kind: "removed", leftVal: left[i] });
      else entries.push(...deepDiff(left[i], right[i], `${path}[${i}]`));
    }
  } else if (typeof left === "object" && typeof right === "object" && !Array.isArray(left) && !Array.isArray(right)) {
    const allKeys = new Set([...Object.keys(left as JSONObject), ...Object.keys(right as JSONObject)]);
    for (const key of allKeys) {
      const newPath = path ? `${path}.${key}` : key;
      if (!(key in (left as JSONObject))) entries.push({ path: newPath, kind: "added", rightVal: (right as JSONObject)[key] });
      else if (!(key in (right as JSONObject))) entries.push({ path: newPath, kind: "removed", leftVal: (left as JSONObject)[key] });
      else entries.push(...deepDiff((left as JSONObject)[key], (right as JSONObject)[key], newPath));
    }
  } else {
    if (left !== right) entries.push({ path: path || "(root)", kind: "changed", leftVal: left, rightVal: right });
    else entries.push({ path: path || "(root)", kind: "unchanged", leftVal: left, rightVal: right });
  }
  return entries;
}

/* ── Stats ── */
interface DiffStats { added: number; removed: number; changed: number; unchanged: number }

/* ── UI ── */
const SAMPLE_LEFT = `# Config v1
name: my-app
version: 1.0.0
port: 3000
debug: false
features:
  auth, logging, cache
limits:
  maxUsers: 100
  timeout: 30`;

const SAMPLE_RIGHT = `# Config v2
name: my-app
version: 1.1.0
port: 8080
debug: true
features:
  auth, logging, metrics
  backup, export
limits:
  maxUsers: 500
  timeout: 60
  retry: 3`;

function lineNumbers(n: number) { return Array.from({ length: n }, (_, i) => i + 1); }

function renderVal(v: JSONValue): string {
  if (v === null) return "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return `[${v.map(renderVal).join(", ")}]`;
  return JSON.stringify(v);
}

export default function DiffPage() {
  const [left, setLeft] = useState(SAMPLE_LEFT);
  const [right, setRight] = useState(SAMPLE_RIGHT);
  const [leftLines, setLeftLines] = useState(lineNumbers(SAMPLE_LEFT.split("\n").length));
  const [rightLines, setRightLines] = useState(lineNumbers(SAMPLE_RIGHT.split("\n").length));
  const [diff, setDiff] = useState<DiffEntry[]>([]);
  const [stats, setStats] = useState<DiffStats>({ added: 0, removed: 0, changed: 0, unchanged: 0 });
  const [parseError, setParseError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"unified" | "split">("unified");

  const computeDiff = useCallback(() => {
    setParseError(null);
    try {
      const leftJson = toonToJson(left);
      const rightJson = toonToJson(right);
      const entries = deepDiff(leftJson, rightJson);
      const diffEntries = entries.filter((e) => e.kind !== "unchanged");
      const unchangedCount = entries.filter((e) => e.kind === "unchanged").length;
      setDiff(diffEntries);
      setStats({
        added: diffEntries.filter((e) => e.kind === "added").length,
        removed: diffEntries.filter((e) => e.kind === "removed").length,
        changed: diffEntries.filter((e) => e.kind === "changed").length,
        unchanged: unchangedCount,
      });
    } catch (e: unknown) {
      setParseError(e instanceof Error ? e.message : String(e));
      setDiff([]);
    }
  }, [left, right]);

  // Compute diff on change with debounce
  useState(() => {
    const t = setTimeout(computeDiff, 300);
    return () => clearTimeout(t);
  });

  const kindColor = (k: ChangeKind) =>
    k === "added" ? "text-green-400" : k === "removed" ? "text-red-400" : k === "changed" ? "text-yellow-400" : "text-gray-500";
  const kindBg = (k: ChangeKind) =>
    k === "added" ? "bg-green-950/30" : k === "removed" ? "bg-red-950/30" : k === "changed" ? "bg-yellow-950/30" : "";

  const kindLabel = (k: ChangeKind) =>
    k === "added" ? "+" : k === "removed" ? "−" : "≠";

  return (
    <ToolLayout>
      <div className="min-h-screen bg-[#0d1117] text-gray-200 font-mono">
        {/* Header */}

        {/* Stats bar */}
        {diff.length > 0 && (
          <div className="border-b border-[#30363d] px-6 py-2 flex gap-5 text-xs bg-[#161b22]">
            <span className="text-green-400">+{stats.added} added</span>
            <span className="text-red-400">−{stats.removed} removed</span>
            <span className="text-yellow-400">≠{stats.changed} changed</span>
            <span className="text-gray-500">{stats.unchanged} unchanged</span>
          </div>
        )}

        {parseError && (
          <div className="border-b border-red-900/50 bg-red-950/30 px-6 py-3 text-xs text-red-400">
            Parse error: {parseError}
          </div>
        )}

        {/* Split editors */}
        <div className="flex" style={{ height: viewMode === "split" ? "calc(100vh - 190px)" : "calc(100vh - 190px)" }}>
          {/* Left panel */}
          <div className="flex-1 flex flex-col border-r border-[#30363d]">
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-[#21262d] bg-[#161b22] flex items-center justify-between">
              <span>Left (Original)</span>
              {viewMode === "split" && <span className="text-[10px] text-[#484f58]">↓ vs →</span>}
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-12 bg-[#161b22] border-r border-[#21262d] text-right pr-2 pt-3 text-xs text-[#484f58] leading-6 select-none overflow-hidden">
                {leftLines.map((n) => <div key={n}>{n}</div>)}
              </div>
              <textarea value={left} onChange={(e) => { setLeft(e.target.value); setLeftLines(lineNumbers(e.target.value.split("\n").length)); }}
                className="flex-1 bg-[#0d1117] text-gray-200 p-3 text-sm leading-6 resize-none outline-none font-mono"
                spellCheck={false} style={{ tabSize: 2 }} />
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-1 flex flex-col">
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-[#21262d] bg-[#161b22] flex items-center justify-between">
              <span>Right (Modified)</span>
              {viewMode === "split" && <span className="text-[10px] text-[#484f58]">↑ vs ←</span>}
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-12 bg-[#161b22] border-r border-[#21262d] text-right pr-2 pt-3 text-xs text-[#484f58] leading-6 select-none overflow-hidden">
                {rightLines.map((n) => <div key={n}>{n}</div>)}
              </div>
              <textarea value={right} onChange={(e) => { setRight(e.target.value); setRightLines(lineNumbers(e.target.value.split("\n").length)); }}
                className="flex-1 bg-[#0d1117] text-gray-200 p-3 text-sm leading-6 resize-none outline-none font-mono"
                spellCheck={false} style={{ tabSize: 2 }} />
            </div>
          </div>
        </div>

        {/* Diff panel */}
        {diff.length > 0 && (
          <div className="border-t border-[#30363d] bg-[#0d1117]" style={{ maxHeight: "240px", overflowY: "auto" }}>
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-[#21262d] bg-[#161b22] sticky top-0">
              Changes — {diff.length} total
            </div>
            <div className="divide-y divide-[#21262d]">
              {diff.map((entry, idx) => (
                <div key={idx} className={`px-4 py-2 flex items-start gap-3 text-xs ${kindBg(entry.kind)}`}>
                  <span className={`font-bold w-4 shrink-0 text-center ${kindColor(entry.kind)}`}>{kindLabel(entry.kind)}</span>
                  <span className="text-[#8b949e] shrink-0">{entry.path}</span>
                  <span className="text-gray-500">=</span>
                  {entry.leftVal !== undefined && <span className={`text-red-400/80 ${entry.kind === "added" ? "line-through opacity-40" : ""}`}>{renderVal(entry.leftVal)}</span>}
                  {entry.kind === "changed" && <span className="text-gray-500 mx-1">→</span>}
                  {entry.rightVal !== undefined && <span className={`text-green-400/80 ${entry.kind === "removed" ? "line-through opacity-40" : ""}`}>{renderVal(entry.rightVal)}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-[#30363d] px-6 py-3 flex items-center justify-between text-xs text-gray-500">
          <span>TOON Diff · Structural comparison</span>
          <span>Build {BUILD_DATE}</span>
        </footer>
      </div>
    </ToolLayout>
  );
}
