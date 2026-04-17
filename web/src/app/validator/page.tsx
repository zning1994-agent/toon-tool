"use client";
import { useState } from "react";
import { BUILD_DATE } from "@/lib/constants";

/* ── Lexer (same logic as converter.ts) ── */
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

/* ── Validation rules ── */
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

/* ── i18n ── */
const I18N: Record<string, Record<string, string>> = {
  en: { subtitle: "Check TOON syntax with line-level error reporting and fix suggestions", placeholder: "Paste your TOON code here...", valid: "✓ Valid", errors: "error(s)", warnings: "warning(s)", noIssues: "No issues found — syntax looks good!", issuesTitle: "Issues", fix: "Fix", lines: "lines", chars: "chars" },
  "zh-CN": { subtitle: "逐行检查 TOON 语法，标出错误并提供修复建议", placeholder: "在此粘贴 TOON 代码...", valid: "✓ 语法正确", errors: "个错误", warnings: "个警告", noIssues: "未发现问题 — 语法正确！", issuesTitle: "问题列表", fix: "修复", lines: "行", chars: "字符" },
};

export default function ValidatorPage() {
  const [input, setInput] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("toon-val-input") || "";
    return "";
  });
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("toon-val-lang") || "en";
    return "en";
  });

  const t = I18N[lang] || I18N.en;
  const issues = validateTOON(input);
  const errs = issues.filter(i => i.sev === "error");
  const warns = issues.filter(i => i.sev === "warning");
  const infos = issues.filter(i => i.sev === "info");
  const lines = input.split("\n");

  function statusText() {
    if (errs.length > 0) return { cls: "err", text: `✗ ${errs.length} ${t.errors}` };
    if (warns.length > 0) return { cls: "warn", text: `⚠ ${warns.length} ${t.warnings}` };
    if (input.trim()) return { cls: "ok", text: "✓ " + t.valid };
    return { cls: "ok", text: "✓ " + t.valid };
  }
  const badge = statusText();

  function handleLangChange(l: string) {
    setLang(l);
    localStorage.setItem("toon-val-lang", l);
  }

  function handleInputChange(v: string) {
    setInput(v);
    localStorage.setItem("toon-val-input", v);
  }

  return (
    <>
      {/* SEO meta — injected via parent layout */}
      <div style={vars}>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', system-ui, sans-serif; min-height: 100vh; }
          header { border-bottom: 1px solid var(--border); padding: 12px 24px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
          .logo { font-size: 16px; font-weight: 600; color: var(--accent); text-decoration: none; }
          .logo span { color: var(--muted); font-weight: 400; }
          nav { display: flex; gap: 16px; margin-left: auto; }
          nav a { color: var(--muted); text-decoration: none; font-size: 14px; }
          nav a:hover, nav a.active { color: var(--text); }
          nav a.active { color: var(--accent); }
          .hero { text-align: center; padding: 28px 24px 20px; }
          .hero h1 { font-size: 22px; font-weight: 600; margin-bottom: 6px; }
          .hero p { color: var(--muted); font-size: 14px; }
          main { max-width: 960px; margin: 0 auto; padding: 0 24px 48px; }
          .toolbar { display: flex; gap: 8px; margin-bottom: 12px; align-items: center; flex-wrap: wrap; }
          .spacer { flex: 1; }
          .btn { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); font-size: 13px; cursor: pointer; }
          .btn:hover { background: #21262d; }
          .btn.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
          .btn.primary:hover { background: #79b8ff; }
          .editor-wrap { position: relative; }
          .line-numbers { position: absolute; top: 0; left: 0; width: 48px; background: var(--surface); border-right: 1px solid var(--border); padding: 14px 8px; text-align: right; font-family: 'Consolas','Fira Code',monospace; font-size: 13px; line-height: 1.6; color: var(--muted); user-select: none; border-radius: 8px 0 0 8px; overflow: hidden; pointer-events: none; }
          textarea { width: 100%; min-height: 360px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; color: var(--text); font-family: 'Consolas','Fira Code',monospace; font-size: 13px; line-height: 1.6; padding: 14px 16px 14px 60px; resize: vertical; outline: none; transition: border-color .2s; }
          textarea:focus { border-color: var(--accent); }
          .status-bar { display: flex; align-items: center; gap: 12px; margin-top: 8px; font-size: 13px; flex-wrap: wrap; }
          .status-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
          .status-badge.ok { background: #0d2a14; color: var(--green); border: 1px solid #1a4d2e; }
          .status-badge.err { background: #2a0d0d; color: var(--red); border: 1px solid #4d1a1a; }
          .status-badge.warn { background: #2a200a; color: var(--yellow); border: 1px solid #4d3a0f; }
          #results { margin-top: 20px; }
          .results-header { font-size: 13px; font-weight: 600; color: var(--muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: .5px; }
          .issue-list { display: flex; flex-direction: column; gap: 6px; }
          .issue { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); font-size: 13px; line-height: 1.5; }
          .issue.error { border-color: #4d1a1a; background: #2a0d0d; }
          .issue.warning { border-color: #4d3a0f; background: #2a200a; }
          .issue.info { border-color: var(--border); }
          .issue-icon { flex-shrink: 0; font-size: 14px; margin-top: 1px; }
          .issue.error .issue-icon { color: var(--red); }
          .issue.warning .issue-icon { color: var(--yellow); }
          .issue.info .issue-icon { color: var(--accent); }
          .issue-body { flex: 1; }
          .issue-msg { color: var(--text); }
          .issue-loc { color: var(--muted); font-family: monospace; font-size: 12px; margin-top: 2px; }
          .issue-fix { color: var(--green); font-size: 12px; margin-top: 3px; }
          .issue-fix code { background: #0d2a14; padding: 1px 5px; border-radius: 4px; }
          footer { border-top: 1px solid var(--border); padding: 16px 24px; text-align: center; font-size: 12px; color: var(--muted); }
          footer a { color: var(--muted); text-decoration: none; }
          footer a:hover { color: var(--accent); }
          #lang-switcher { position: fixed; top: 14px; right: 24px; z-index: 10; }
          #lang-switcher select { background: var(--surface); border: 1px solid var(--border); color: var(--text); font-size: 12px; padding: 4px 8px; border-radius: 6px; cursor: pointer; }
        `}</style>

        <div id="lang-switcher">
          <select value={lang} onChange={e => handleLangChange(e.target.value)}>
            <option value="en">EN</option>
            <option value="zh-CN">中文</option>
          </select>
        </div>

        <header>
          <a className="logo" href="https://toon-tool.ohgiantai.com">toon.<span>tool</span></a>
          <nav>
            <a href="https://toon-tool.ohgiantai.com">Converter</a>
            <a href="#" className="active">Validator</a>
          </nav>
        </header>

        <div className="hero">
          <h1>🔍 TOON Validator</h1>
          <p>{t.subtitle}</p>
        </div>

        <main>
          <div className="toolbar">
            <button className="btn primary" onClick={() => {}}>Validate</button>
            <button className="btn" onClick={() => handleInputChange("")}>Clear</button>
            <div className="spacer" />
            <span style={{ color: "var(--muted)", fontSize: "13px" }}>
              {input.length} {t.chars} · {lines.length} {t.lines}
            </span>
          </div>

          <div className="editor-wrap">
            <div className="line-numbers">
              {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <textarea
              value={input}
              onChange={e => handleInputChange(e.target.value)}
              placeholder={t.placeholder}
              spellCheck={false}
            />
          </div>

          <div className="status-bar">
            <span className={`status-badge ${badge.cls}`}>{badge.text}</span>
          </div>

          <div id="results">
            {input.trim() && (
              <>
                <div className="results-header">{t.issuesTitle} ({errs.length} errors, {warns.length} warnings)</div>
                <div className="issue-list">
                  {[...errs, ...warns, ...infos].map((issue, idx) => (
                    <div key={idx} className={`issue ${issue.sev}`}>
                      <span className="issue-icon">{issue.sev === "error" ? "✗" : issue.sev === "warning" ? "⚠" : "ℹ"}</span>
                      <div className="issue-body">
                        <div className="issue-msg">{issue.msg}</div>
                        <div className="issue-loc">Line {issue.line}</div>
                        {issue.fix && <div className="issue-fix">→ {t.fix}: <code>{issue.fix}</code></div>}
                      </div>
                    </div>
                  ))}
                  {issues.length === 0 && (
                    <div className="issue info">
                      <span className="issue-icon">✓</span>
                      <div className="issue-body"><div className="issue-msg">{t.noIssues}</div></div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>

        <footer>
          Part of <a href="https://github.com/zning1994-agent/toon-tool">toon-tool</a> ·{" "}
          <a href="https://github.com/zning1994-agent/toon-tool">Converter</a> ·{" "}
          TOON spec: <a href="https://toonformat.dev">toonformat.dev</a> ·{" "}
          Last updated: {BUILD_DATE}
        </footer>
      </div>
    </>
  );
}

const vars = {
  "--bg": "#0d1117",
  "--surface": "#161b22",
  "--border": "#30363d",
  "--text": "#e6edf3",
  "--muted": "#7d8590",
  "--accent": "#58a6ff",
  "--green": "#3fb950",
  "--red": "#f85149",
  "--yellow": "#d29922",
} as React.CSSProperties;
