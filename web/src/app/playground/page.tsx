"use client";
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
  notes: >
    This release includes
    multi-line content
    support
languages[3]:
  JavaScript, Python, Go
  Rust, TypeScript
  Java, C++`;

function lineNumbers(n: number) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export default function PlaygroundPage() {
  const [toon, setToon] = useState(SAMPLE);
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"toon→json" | "json→toon">("toon→json");
  const toonRef = useRef<HTMLTextAreaElement>(null);
  const jsonRef = useRef<HTMLTextAreaElement>(null);
  const [toonLines, setToonLines] = useState(lineNumbers(SAMPLE.split("\n").length));
  const [jsonLines, setJsonLines] = useState<number[]>([]);

  const convert = (src: string, dir: "toon→json" | "json→toon") => {
    if (!src.trim()) { setJson(""); setError(""); return; }
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

  // live convert
  useEffect(() => {
    const t = setTimeout(() => convert(toon, activeTab), 150);
    return () => clearTimeout(t);
  }, [toon, activeTab]);

  const syncScroll = (src: React.RefObject<HTMLTextAreaElement | null>, tgt: React.RefObject<HTMLTextAreaElement | null>) => {
    if (!src.current || !tgt.current) return;
    tgt.current.scrollTop = src.current.scrollTop;
    tgt.current.scrollLeft = src.current.scrollLeft;
  };

  const handleSwap = () => {
    const newTab: "toon→json" | "json→toon" = activeTab === "toon→json" ? "json→toon" : "toon→json";
    setActiveTab(newTab);
    setTimeout(() => convert(toon, newTab), 0);
  };

  return (
    <>
      <title>TOON Playground — 实时代码实验室</title>
      <meta name="description" content="TOON Playground: 实时代码实验室，TOON 格式与 JSON 格式实时互转，左侧输入，右侧即时预览。" />
      <meta property="og:title" content="TOON Playground" />
      <meta property="og:description" content="TOON 格式与 JSON 格式实时互转，即时预览。" />

      <div className="min-h-screen bg-[#0d1117] text-gray-200 font-mono">
        {/* Header */}
        <header className="border-b border-[#30363d] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">TOON Playground</h1>
            <p className="text-xs text-gray-400 mt-0.5">实时代码实验室 · 左侧输入，右侧即时预览</p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex bg-[#161b22] rounded-lg border border-[#30363d] p-0.5">
              <button
                onClick={() => { setToon(SAMPLE); setActiveTab("toon→json"); }}
                className="px-3 py-1 text-xs rounded-md text-gray-300 hover:text-white hover:bg-[#30363d] transition"
              >重置示例</button>
            </div>
            <button
              onClick={handleSwap}
              className="px-3 py-1.5 text-xs rounded-lg border border-[#30363d] text-gray-300 hover:text-white hover:bg-[#30363d] transition"
              title="交换转换方向"
            >
              ⇄ 交换
            </button>
          </div>
        </header>

        {/* Direction pill */}
        <div className="px-6 py-3 flex items-center gap-4 border-b border-[#30363d]">
          <div className="flex bg-[#161b22] rounded-lg border border-[#30363d] p-0.5">
            {(["toon→json", "json→toon"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setActiveTab(t); setTimeout(() => convert(toon, t), 0); }}
                className={`px-4 py-1.5 text-sm rounded-md transition ${
                  activeTab === t
                    ? "bg-[#238636] text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >{t}</button>
            ))}
          </div>
          {error && (
            <span className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-1 rounded">
              ⚠ {error}
            </span>
          )}
        </div>

        {/* Split editor */}
        <div className="flex" style={{ height: "calc(100vh - 130px)" }}>
          {/* Left: TOON input */}
          <div className="flex-1 flex flex-col border-r border-[#30363d]">
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-[#21262d] bg-[#161b22]">TOON</div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-12 bg-[#161b22] border-r border-[#21262d] text-right pr-2 pt-3 text-xs text-[#484f58] leading-6 select-none overflow-hidden">
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
                className="flex-1 bg-[#0d1117] text-gray-200 p-3 text-sm leading-6 resize-none outline-none font-mono"
                spellCheck={false}
                placeholder="输入 TOON 或 JSON..."
                style={{ tabSize: 2 }}
              />
            </div>
          </div>

          {/* Right: JSON output */}
          <div className="flex-1 flex flex-col">
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-[#21262d] bg-[#161b22]">
              {activeTab === "toon→json" ? "JSON" : "TOON"}
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-12 bg-[#161b22] border-r border-[#21262d] text-right pr-2 pt-3 text-xs text-[#484f58] leading-6 select-none overflow-hidden">
                {jsonLines.map((n) => (
                  <div key={n}>{n}</div>
                ))}
              </div>
              <textarea
                ref={jsonRef}
                value={json}
                readOnly
                onScroll={() => syncScroll(jsonRef, toonRef)}
                className="flex-1 bg-[#0d1117] text-green-400 p-3 text-sm leading-6 resize-none outline-none font-mono"
                spellCheck={false}
                placeholder="输出..."
                style={{ tabSize: 2 }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#30363d] px-6 py-3 flex items-center justify-between text-xs text-gray-500">
          <span>TOON Playground · 实时代码实验室</span>
          <span>Build {BUILD_DATE}</span>
        </footer>
      </div>
    </>
  );
}
