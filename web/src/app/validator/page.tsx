"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState, useEffect } from "react";
import { BUILD_DATE } from "@/lib/constants";

/* ── Lexer (kept in sync with converter.ts; local copy so validator page stays self-contained) ── */
function splitCSV(s: string): string[] {
  const result: string[] = [];
  let accum = "";
  let inQuotes = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"' && (i === 0 || s[i - 1] !== "\\")) inQuotes = !inQuotes;
    if (ch === "," && !inQuotes) {
      if (accum.trim() || result.length > 0) result.push(accum.trim());
      accum = "";
    } else {
      accum += s[i];
    }
  }
  if (accum.trim() || result.length > 0) result.push(accum.trim());
  return result;
}

interface LexedLine {
  raw: string; content: string; indent: number; kind: string;
  key?: string; rawVal?: string; fields?: string[]; size?: number; rowVals?: string[]; line?: number;
}

function lex(toon: string): LexedLine[] {
  return toon.split("\n").map((raw, idx) => {
    const trimmed = raw.trim();
    const indent = raw.search(/\S/);
    const content = trimmed;
    if (!trimmed) return { raw, content: "", indent: 0, kind: "blank", line: idx + 1 };

    if (/^-\s/.test(content) || content === "-") {
      const rest = content.length > 1 ? content.slice(1).trim() : "";
      const m = rest.match(/^\[(\d+)\]:\s*(.*)$/);
      if (m) return { raw, content, indent, kind: "arr-nested", size: +m[1], rowVals: m[2] ? splitCSV(m[2]) : [], line: idx + 1 };
      if (!rest) return { raw, content, indent, kind: "arr-bullet", rawVal: "", line: idx + 1 };
      if (rest.includes(":")) return { raw, content, indent, kind: "arr-kv", rawVal: rest, line: idx + 1 };
      return { raw, content, indent, kind: "arr-bullet", rawVal: rest, line: idx + 1 };
    }

    const rt = content.match(/^\[(\d+)\]\{(.+?)\}:\s*$/);
    if (rt) return { raw, content, indent, kind: "kv-root-tabular", size: +rt[1], fields: rt[2].split(",").map(s => s.trim()), line: idx + 1 };

    const ra = content.match(/^\[(\d+)\]:\s*(.*)$/);
    if (ra) {
      const rest = ra[2].trim();
      return { raw, content, indent, kind: "kv-root-arr", size: +ra[1], rawVal: rest, rowVals: rest ? splitCSV(rest) : [], line: idx + 1 };
    }

    const tm = content.match(/^(.+?)\[(\d+)\]\{(.+?)\}:\s*$/);
    if (tm) return { raw, content, indent, kind: "kv-tabular", key: tm[1].trim(), size: +tm[2], fields: tm[3].split(",").map(s => s.trim()), line: idx + 1 };

    const im = content.match(/^(.+?)\[(\d+)\]:\s*(.*)$/);
    if (im) {
      const rest = im[3].trim();
      return { raw, content, indent, kind: "kv-inline-arr", key: im[1].trim(), size: +im[2], rawVal: rest, rowVals: rest ? splitCSV(rest) : [], line: idx + 1 };
    }

    const cidx = content.indexOf(":");
    if (cidx !== -1) {
      const key = content.slice(0, cidx).trim();
      const rv = content.slice(cidx + 1);
      if (rv.trim() === "") return { raw, content, indent, kind: "kv-empty", key, line: idx + 1 };
      return { raw, content, indent, kind: "kv", key, rawVal: rv.trim(), line: idx + 1 };
    }

    return { raw, content, indent, kind: "kv", key: content, rawVal: "", line: idx + 1 };
  });
}

interface Issue {
  sev: "error" | "warning" | "info";
  line: number;
  msg: string;
  fix?: string;
}

function validateTOON(toon: string): Issue[] {
  const issues: Issue[] = [];
  if (!toon.trim()) return issues;
  const lines = lex(toon);
  const seenTopKeys = new Set<string>();

  for (const ln of lines) {
    if (ln.kind === "blank") continue;

    if (/\]\[/.test(ln.content)) {
      issues.push({ sev: "error", line: ln.line!, msg: "Mixed bracket style detected.", fix: "Use { } for field lists: key[3]{f1,f2}, not key[3][...]" });
    }
    if (/^\w+\{/.test(ln.content) && !/\}\d+\]/.test(ln.content)) {
      issues.push({ sev: "warning", line: ln.line!, msg: "Field list {fields} without array size [N].", fix: "Add array size: key[3]{field1,field2}" });
    }
    if (ln.rawVal !== undefined) {
      const qc = (ln.rawVal.match(/"/g) || []).length;
      if (qc % 2 !== 0) {
        issues.push({ sev: "error", line: ln.line!, msg: "Unclosed quote — odd number of double-quote characters.", fix: "Pair every \" or escape literal quotes as \\\"" });
      }
    }
    if ((ln.kind === "kv" || ln.kind === "kv-empty") && ln.indent === 0 && ln.key) {
      if (seenTopKeys.has(ln.key)) {
        issues.push({ sev: "error", line: ln.line!, msg: `Duplicate key at top level: "${ln.key}"`, fix: "Remove or rename the duplicate key" });
      }
      seenTopKeys.add(ln.key);
    }
    if (/^\[\d+\]$/.test(ln.content)) {
      issues.push({ sev: "error", line: ln.line!, msg: "Array guard [N] needs a colon.", fix: "Use [3]: value or [3]{f1,f2}: for tabular" });
    }
    if (ln.kind === "kv-inline-arr" && ln.rowVals) {
      if (ln.size !== ln.rowVals.length) {
        issues.push({ sev: "warning", line: ln.line!, msg: `Array size mismatch: [${ln.size}] declared but ${ln.rowVals.length} value(s) found.`, fix: `Adjust [${ln.rowVals.length}] to match actual count, or check for missing commas.` });
      }
    }
    if (ln.kind === "kv-tabular" && ln.fields) {
      const li = lines.indexOf(ln);
      const hf = ln.fields.length;
      for (let j = li + 1; j < lines.length; j++) {
        const row = lines[j];
        if (row.kind === "blank") continue;
        if (row.indent <= ln.indent) break;
        const vals = splitCSV(row.content);
        if (vals.length !== hf) {
          issues.push({ sev: "error", line: row.line!, msg: `Tabular row has ${vals.length} field(s), expected ${hf}.`, fix: `Row must have ${hf} comma-separated values.` });
        }
      }
    }
    if ((ln.kind === "kv" || ln.kind === "kv-empty") && (!ln.key || !ln.key.trim())) {
      issues.push({ sev: "error", line: ln.line!, msg: "Empty key (no name before the colon).", fix: "Add a key name: keyName: value" });
    }
    if (ln.kind === "kv" && ln.rawVal) {
      const v = ln.rawVal;
      if (!v.startsWith('"') && /[\s,#]/.test(v)) {
        issues.push({ sev: "info", line: ln.line!, msg: `Value contains special characters that may be ambiguous.`, fix: 'Quote the value: key: "value with spaces"' });
      }
    }
  }
  return issues;
}

const STORAGE_KEY = "toon-val-input";

export default function ValidatorPage() {
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved) setInput(saved);
  }, []);

  const handleInputChange = (v: string) => {
    setInput(v);
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch {
      /* storage unavailable — silently ignore */
    }
  };

  const issues = validateTOON(input);
  const errs = issues.filter((i) => i.sev === "error");
  const warns = issues.filter((i) => i.sev === "warning");
  const infos = issues.filter((i) => i.sev === "info");
  const lines = input.split("\n");

  let badgeCls: "ok" | "err" | "warn" = "ok";
  let badgeText = "✓ Valid";
  if (errs.length > 0) {
    badgeCls = "err";
    badgeText = `✗ ${errs.length} error${errs.length > 1 ? "s" : ""}`;
  } else if (warns.length > 0) {
    badgeCls = "warn";
    badgeText = `⚠ ${warns.length} warning${warns.length > 1 ? "s" : ""}`;
  }

  const sortedIssues = [...errs, ...warns, ...infos];

  return (
    <ToolLayout>
      <div className="tool-shell">
        <section className="tool-hero">
          <h1>TOON Validator</h1>
          <p>
            Line-level TOON syntax checking with fix suggestions. Paste your TOON
            and see errors, warnings and style hints instantly.
          </p>
        </section>

        <div className="tool-card">
          <div className="tool-toolbar">
            <button
              className="btn btn-small"
              onClick={() => handleInputChange("")}
              disabled={!input}
            >
              Clear
            </button>
            <span className={`tool-badge ${badgeCls}`}>{badgeText}</span>
            <div className="spacer" />
            <span className="meta">
              {lines.length} lines · {input.length} chars
            </span>
          </div>

          <div className="tool-panel">
            <div className="tool-panel-header">
              <span>TOON source</span>
              <span className="hint">auto-saved</span>
            </div>
            <div className="tool-editor">
              <div className="tool-line-numbers" aria-hidden="true">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Paste your TOON code here..."
                spellCheck={false}
                className="tool-textarea"
                style={{ tabSize: 2 }}
                aria-label="TOON source"
              />
            </div>
          </div>

          {input.trim() && (
            <div className="tool-issue-list">
              {sortedIssues.length === 0 ? (
                <div className="tool-banner ok">
                  ✓ No issues found — syntax looks good.
                </div>
              ) : (
                sortedIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`tool-issue ${
                      issue.sev === "error" ? "err" : issue.sev === "warning" ? "warn" : "info"
                    }`}
                  >
                    <span className="tool-issue-icon">
                      {issue.sev === "error" ? "✗" : issue.sev === "warning" ? "⚠" : "ℹ"}
                    </span>
                    <div className="tool-issue-body">
                      <div className="tool-issue-msg">{issue.msg}</div>
                      <div className="tool-issue-loc">Line {issue.line}</div>
                      {issue.fix && (
                        <div className="tool-issue-fix">
                          → Fix: <code>{issue.fix}</code>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <footer className="tool-footer">
        <span>TOON Validator</span>
        <span className="sep">·</span>
        <a href="https://toonformat.dev" target="_blank" rel="noopener noreferrer">
          Spec
        </a>
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
