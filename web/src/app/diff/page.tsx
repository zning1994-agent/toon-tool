"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState, useEffect, useCallback } from "react";
import { BUILD_DATE } from "@/lib/constants";

/* ── Shared types ── */
type JSONValue = string | number | boolean | null | JSONValue[] | JSONObject;
interface JSONObject { [key: string]: JSONValue }

/* ── TOON → JSON (local minimal parser; full parser lives in converter.ts) ── */
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
}

function deepDiff(left: JSONValue, right: JSONValue, path = ""): DiffEntry[] {
  const entries: DiffEntry[] = [];
  if (typeof left !== typeof right || (left === null) !== (right === null)) {
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
  } else if (typeof left === "object" && typeof right === "object" && left !== null && right !== null && !Array.isArray(left) && !Array.isArray(right)) {
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

interface DiffStats { added: number; removed: number; changed: number; unchanged: number }

/* ── UI ── */
const SAMPLE_LEFT = `name: my-app
version: 1.0.0
port: 3000
debug: false
limits:
  maxUsers: 100
  timeout: 30`;

const SAMPLE_RIGHT = `name: my-app
version: 1.1.0
port: 8080
debug: true
limits:
  maxUsers: 500
  timeout: 60
  retry: 3`;

function lineNumbers(n: number) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

function renderVal(v: JSONValue): string {
  if (v === null) return "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return `"${v}"`;
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

  useEffect(() => {
    const t = setTimeout(computeDiff, 300);
    return () => clearTimeout(t);
  }, [computeDiff]);

  const kindLabel = (k: ChangeKind) =>
    k === "added" ? "+" : k === "removed" ? "−" : "≠";

  return (
    <ToolLayout>
      <div className="tool-shell">
        <section className="tool-hero">
          <h1>TOON Diff</h1>
          <p>
            Structural comparison of two TOON documents. Added, removed and
            changed fields are grouped by JSON path — not just line number.
          </p>
        </section>

        <div className="tool-card">
          <div className="tool-toolbar">
            {parseError && (
              <span className="tool-badge err" role="alert">
                ⚠ {parseError}
              </span>
            )}
            {!parseError && diff.length === 0 && (
              <span className="tool-badge ok">✓ Identical</span>
            )}
            {!parseError && diff.length > 0 && (
              <span className="tool-badge warn">
                {diff.length} change{diff.length > 1 ? "s" : ""}
              </span>
            )}
            <div className="spacer" />
            <span className="meta">
              {leftLines.length} vs {rightLines.length} lines
            </span>
          </div>

          <div className="tool-split">
            <div className="tool-panel">
              <div className="tool-panel-header">
                <span>Left (original)</span>
                <span className="hint">.toon</span>
              </div>
              <div className="tool-editor">
                <div className="tool-line-numbers" aria-hidden="true">
                  {leftLines.map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>
                <textarea
                  value={left}
                  onChange={(e) => {
                    setLeft(e.target.value);
                    setLeftLines(lineNumbers(e.target.value.split("\n").length));
                  }}
                  className="tool-textarea"
                  spellCheck={false}
                  style={{ tabSize: 2 }}
                  aria-label="Left source"
                />
              </div>
            </div>

            <div className="tool-panel">
              <div className="tool-panel-header">
                <span>Right (modified)</span>
                <span className="hint">.toon</span>
              </div>
              <div className="tool-editor">
                <div className="tool-line-numbers" aria-hidden="true">
                  {rightLines.map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>
                <textarea
                  value={right}
                  onChange={(e) => {
                    setRight(e.target.value);
                    setRightLines(lineNumbers(e.target.value.split("\n").length));
                  }}
                  className="tool-textarea"
                  spellCheck={false}
                  style={{ tabSize: 2 }}
                  aria-label="Right source"
                />
              </div>
            </div>
          </div>

          <div className="tool-stats-bar">
            <span className="added">+{stats.added} added</span>
            <span className="removed">−{stats.removed} removed</span>
            <span className="changed">≠{stats.changed} changed</span>
            <span className="muted">{stats.unchanged} unchanged</span>
          </div>

          {diff.length > 0 && (
            <div className="tool-diff-rows">
              <div className="head">Changes — {diff.length} total</div>
              {diff.map((entry, idx) => (
                <div key={idx} className={`tool-diff-row ${entry.kind}`}>
                  <span className="kind">{kindLabel(entry.kind)}</span>
                  <span className="path">{entry.path}</span>
                  <span className="sep">=</span>
                  {entry.leftVal !== undefined && (
                    <span className="from">{renderVal(entry.leftVal)}</span>
                  )}
                  {entry.kind === "changed" && <span className="arrow">→</span>}
                  {entry.rightVal !== undefined && (
                    <span className="to">{renderVal(entry.rightVal)}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="tool-footer">
        <span>TOON Diff</span>
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
