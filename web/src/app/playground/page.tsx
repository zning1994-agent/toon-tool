"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState, useEffect, useRef } from "react";
import { toonToJson, jsonToToon } from "@/lib/converter";
import { BUILD_DATE } from "@/lib/constants";

const SAMPLE = `name: GitHub
url: https://github.com
stars: 42000
fork: true
latest_release:
  tag: v3.2.1
  date: 2026-01-15
  assets: 5
languages[3]: JavaScript,Python,Go`;

type Direction = "toon→json" | "json→toon";

function lineNumbers(n: number) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export default function PlaygroundPage() {
  const [toon, setToon] = useState(SAMPLE);
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Direction>("toon→json");
  const toonRef = useRef<HTMLTextAreaElement>(null);
  const jsonRef = useRef<HTMLTextAreaElement>(null);
  const [toonLines, setToonLines] = useState(lineNumbers(SAMPLE.split("\n").length));
  const [jsonLines, setJsonLines] = useState<number[]>([]);

  const convert = (src: string, dir: Direction) => {
    if (!src.trim()) {
      setJson("");
      setError("");
      setJsonLines([]);
      return;
    }
    try {
      if (dir === "toon→json") {
        const result = toonToJson(src);
        const formatted = JSON.stringify(result, null, 2);
        setJson(formatted);
        setError("");
        setJsonLines(lineNumbers(formatted.split("\n").length));
      } else {
        const parsed = JSON.parse(src);
        const result = jsonToToon(parsed);
        setJson(result);
        setError("");
        setJsonLines(lineNumbers(result.split("\n").length));
      }
    } catch (e: unknown) {
      setJson("");
      setError(e instanceof Error ? e.message : String(e));
      setJsonLines([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => convert(toon, activeTab), 150);
    return () => clearTimeout(timer);
  }, [toon, activeTab]);

  const syncScroll = (
    src: React.RefObject<HTMLTextAreaElement | null>,
    tgt: React.RefObject<HTMLTextAreaElement | null>,
  ) => {
    if (!src.current || !tgt.current) return;
    tgt.current.scrollTop = src.current.scrollTop;
    tgt.current.scrollLeft = src.current.scrollLeft;
  };

  const outputLabel = activeTab === "toon→json" ? "JSON" : "TOON";
  const inputLabel = activeTab === "toon→json" ? "TOON" : "JSON";
  const inputPlaceholder =
    activeTab === "toon→json" ? "Paste TOON here..." : "Paste JSON here...";

  return (
    <ToolLayout>
      <div className="tool-shell">
        <section className="tool-hero">
          <h1>TOON Playground</h1>
          <p>
            Live two-way editor with synced scrolling and line numbers. Toggle the
            direction to convert between TOON and JSON in real time.
          </p>
        </section>

        <div className="tool-card">
          <div className="tool-toolbar">
            <div className="tool-pill-group" role="tablist">
              {(["toon→json", "json→toon"] as const).map((dir) => (
                <button
                  key={dir}
                  className={`tool-pill ${activeTab === dir ? "active" : ""}`}
                  onClick={() => setActiveTab(dir)}
                  role="tab"
                  aria-selected={activeTab === dir}
                >
                  {dir}
                </button>
              ))}
            </div>
            {error && (
              <span className="tool-badge err" role="alert">
                ⚠ {error}
              </span>
            )}
            <div className="spacer" />
            <span className="meta">
              {toon.split("\n").length} lines · {toon.length} chars
            </span>
          </div>

          <div className="tool-split">
            <div className="tool-panel">
              <div className="tool-panel-header">
                <span>{inputLabel} input</span>
                <span className="hint">editable</span>
              </div>
              <div className="tool-editor">
                <div className="tool-line-numbers" aria-hidden="true">
                  {toonLines.map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>
                <textarea
                  ref={toonRef}
                  value={toon}
                  onChange={(e) => {
                    setToon(e.target.value);
                    setToonLines(lineNumbers(e.target.value.split("\n").length));
                  }}
                  onScroll={() => syncScroll(toonRef, jsonRef)}
                  className="tool-textarea"
                  spellCheck={false}
                  placeholder={inputPlaceholder}
                  style={{ tabSize: 2 }}
                  aria-label={`${inputLabel} input`}
                />
              </div>
            </div>

            <div className="tool-panel">
              <div className="tool-panel-header">
                <span>{outputLabel} output</span>
                <span className="hint">read-only</span>
              </div>
              <div className="tool-editor">
                <div className="tool-line-numbers" aria-hidden="true">
                  {jsonLines.map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>
                <textarea
                  ref={jsonRef}
                  value={json}
                  readOnly
                  onScroll={() => syncScroll(jsonRef, toonRef)}
                  className="tool-textarea"
                  spellCheck={false}
                  placeholder="Converted output appears here..."
                  style={{ tabSize: 2 }}
                  aria-label={`${outputLabel} output`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="tool-footer">
        <span>TOON Playground</span>
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
