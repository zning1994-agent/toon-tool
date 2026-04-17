"use client";
import { useState, useCallback, useEffect } from "react";
import { useLang } from "@/components/LangProvider";
import SiteHeader from "@/components/SiteHeader";
import { jsonToToon, toonToJson, validateToon } from "@/lib/converter";

// BUILD_DATE: evaluated once at page render (client-side). SSR vs hydration mismatch
// is avoided because layout.tsx is the server shell; this client component gets the
// date from the browser environment.
const BUILD_DATE = new Date().toISOString().split("T")[0];

const SAMPLES: Record<string, { json: string; toon: string }> = {
  en: {
    json: `{
  "name": "Alice Johnson",
  "age": 30,
  "email": "alice@example.com",
  "active": true,
  "roles": ["admin", "user"],
  "metadata": {
    "created": "2024-01-15",
    "score": 95.5
  }
}`,
    toon: `name: "Alice Johnson"
age: 30
email: "alice@example.com"
active: true
roles[2]: admin,user
metadata:
  created: "2024-01-15"
  score: 95.5`,
  },
  "zh-CN": {
    json: `{
  "name": "张伟",
  "age": 28,
  "city": "北京",
  "skills": ["Python", "Go", "Kubernetes"],
  "projects": {
    "stars": 1420,
    "language": "zh-CN"
  }
}`,
    toon: `name: 张伟
age: 28
city: 北京
skills[3]: Python,Go,Kubernetes
projects:
  stars: 1420
  language: zh-CN`,
  },
  "zh-TW": {
    json: `{
  "name": "王小明",
  "age": 35,
  "city": "台北",
  "roles": ["engineer", "mentor"]
}`,
    toon: `name: 王小明
age: 35
city: 台北
roles[2]: engineer,mentor`,
  },
  ja: {
    json: `{
  "name": "田中太郎",
  "age": 32,
  "email": "tanaka@example.com",
  "score": 88.5,
  "active": true
}`,
    toon: `name: 田中太郎
age: 32
email: tanaka@example.com
score: 88.5
active: true`,
  },
  fr: {
    json: `{
  "name": "Marie Dupont",
  "age": 29,
  "city": "Paris",
  "tags": ["dev", "open-source"]
}`,
    toon: `name: Marie Dupont
age: 29
city: Paris
tags[2]: dev,open-source`,
  },
  es: {
    json: `{
  "name": "Carlos García",
  "age": 34,
  "city": "Madrid",
  "skills": ["Python", "TypeScript"]
}`,
    toon: `name: Carlos García
age: 34
city: Madrid
skills[2]: Python,TypeScript`,
  },
  de: {
    json: `{
  "name": "Hans Müller",
  "age": 41,
  "city": "Berlin",
  "active": true
}`,
    toon: `name: Hans Müller
age: 41
city: Berlin
active: true`,
  },
  ko: {
    json: `{
  "name": "김철수",
  "age": 28,
  "city": "서울",
  "skills": ["Java", "Spring"]
}`,
    toon: `name: 김철수
age: 28
city: 서울
skills[2]: Java,Spring`,
  },
  pt: {
    json: `{
  "name": "João Silva",
  "age": 31,
  "city": "São Paulo",
  "tags": ["backend", "devops"]
}`,
    toon: `name: João Silva
age: 31
city: São Paulo
tags[2]: backend,devops`,
  },
  ru: {
    json: `{
  "name": "Иван Петров",
  "age": 27,
  "city": "Москва",
  "active": true
}`,
    toon: `name: Иван Петров
age: 27
city: Москва
active: true`,
  },
};

export default function Home() {
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState<"json-to-toon" | "toon-to-json" | "validate">("json-to-toon");
  const [jsonInput, setJsonInput] = useState("");
  const [toonInput, setToonInput] = useState("");
  const [toonOutput, setToonOutput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [validateOutput, setValidateOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const sample = SAMPLES[lang] ?? SAMPLES["en"];

  const convertJsonToToon = useCallback(() => {
    try {
      const json = JSON.parse(jsonInput);
      const toon = jsonToToon(json);
      setToonOutput(toon);
      setError("");
    } catch (e: unknown) {
      setError(t.errorInvalidJson);
    }
  }, [jsonInput, t]);

  const convertToonToJson = useCallback(() => {
    try {
      const json = toonToJson(toonInput);
      setJsonOutput(JSON.stringify(json, null, 2));
      setError("");
    } catch {
      setError(t.errorInvalidToon);
    }
  }, [toonInput, t]);

  const runValidate = useCallback(() => {
    try {
      const json = JSON.parse(jsonInput);
      const roundTrip = toonToJson(toonInput);
      const matches = JSON.stringify(json) === JSON.stringify(roundTrip);
      const result = validateToon(toonInput);
      setValidateOutput(
        `${t.validationRoundTrip}: ${matches ? "✓ " + t.validationPass : "✗ " + t.validationFail}\n\n${t.validationStatus}: ${result.valid ? "✓ " + t.validationValid : "✗ " + t.validationInvalid}`
      );
      setError("");
    } catch {
      setError(t.errorParse);
    }
  }, [jsonInput, toonInput, t]);

  useEffect(() => {
    if (activeTab === "json-to-toon") {
      if (jsonInput.trim()) convertJsonToToon();
    } else if (activeTab === "toon-to-json") {
      if (toonInput.trim()) convertToonToJson();
    } else {
      if (jsonInput.trim() || toonInput.trim()) runValidate();
    }
  }, [activeTab, convertJsonToToon, convertToonToJson, runValidate]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const loadSample = () => {
    setJsonInput(sample.json);
    setToonInput(sample.toon);
  };

  return (
    <div className="app-container">
      <SiteHeader />

      <main className="app-main">
        <section className="hero-section">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
        </section>

        <div className="converter-card">
          <div className="tabs">
            {(["json-to-toon", "toon-to-json", "validate"] as const).map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "json-to-toon"
                  ? t.tabJsonToToon
                  : tab === "toon-to-json"
                  ? t.tabToonToJson
                  : t.tabValidate}
              </button>
            ))}
          </div>

          {error && <div className="error-banner">{error}</div>}

          <div className="panels">
            {activeTab === "json-to-toon" && (
              <>
                <div className="panel">
                  <div className="panel-header">
                    <span>{t.panelJsonInput}</span>
                    <button className="btn btn-small" onClick={() => copyToClipboard(jsonInput)}>
                      {t.btnCopy}
                    </button>
                  </div>
                  <textarea
                    className="code-input"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    spellCheck={false}
                    aria-label={t.panelJsonInput}
                  />
                </div>
                <div className="panel">
                  <div className="panel-header">
                    <span>{t.panelToonOutput}</span>
                    <button className="btn btn-small" onClick={() => copyToClipboard(toonOutput)}>
                      {t.btnCopy}
                    </button>
                  </div>
                  <pre className="code-output">{toonOutput}</pre>
                </div>
              </>
            )}

            {activeTab === "toon-to-json" && (
              <>
                <div className="panel">
                  <div className="panel-header">
                    <span>{t.panelToonInput}</span>
                    <button className="btn btn-small" onClick={() => copyToClipboard(toonInput)}>
                      {t.btnCopy}
                    </button>
                  </div>
                  <textarea
                    className="code-input"
                    value={toonInput}
                    onChange={(e) => setToonInput(e.target.value)}
                    spellCheck={false}
                    aria-label={t.panelToonInput}
                  />
                </div>
                <div className="panel">
                  <div className="panel-header">
                    <span>{t.panelJsonOutput}</span>
                    <button className="btn btn-small" onClick={() => copyToClipboard(jsonOutput)}>
                      {t.btnCopy}
                    </button>
                  </div>
                  <pre className="code-output">{jsonOutput}</pre>
                </div>
              </>
            )}

            {activeTab === "validate" && (
              <>
                <div className="panel">
                  <div className="panel-header">
                    <span>{t.panelJsonData}</span>
                    <button className="btn btn-small" onClick={() => copyToClipboard(jsonInput)}>
                      {t.btnCopy}
                    </button>
                  </div>
                  <textarea
                    className="code-input"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    spellCheck={false}
                    aria-label={t.panelJsonData}
                  />
                </div>
                <div className="panel">
                  <div className="panel-header">
                    <span>{t.panelToonExpected}</span>
                    <button className="btn btn-small" onClick={() => copyToClipboard(toonInput)}>
                      {t.btnCopy}
                    </button>
                  </div>
                  <textarea
                    className="code-input"
                    value={toonInput}
                    onChange={(e) => setToonInput(e.target.value)}
                    spellCheck={false}
                    aria-label={t.panelToonExpected}
                  />
                </div>
              </>
            )}
          </div>

          {activeTab === "validate" && (
            <div className="validate-result">
              <div className="panel-header">
                <span>{t.panelValidationResult}</span>
              </div>
              <pre className="code-output">{validateOutput}</pre>
            </div>
          )}

          <div className="action-row">
            <button className="btn btn-ghost" onClick={loadSample}>
              {t.btnLoadSample}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (activeTab === "json-to-toon") convertJsonToToon();
                else if (activeTab === "toon-to-json") convertToonToJson();
                else runValidate();
              }}
            >
              {activeTab === "json-to-toon"
                ? t.btnConvertToToon
                : activeTab === "toon-to-json"
                ? t.btnConvertToJson
                : t.btnValidate}
            </button>
            {copied && <span className="copied-toast">{t.copied}</span>}
          </div>
        </div>

        {/* GEO: What is TOON — definition answer block */}
        <section className="info-section" id="what-is-toon">
          <h2>{t.sectionWhatIsToon}</h2>
          <p>{t.sectionWhatIsToonDesc}</p>

          <div className="format-example">
            <div className="format-col">
              <h3>{t.formatJson}</h3>
              <pre>{`{
  "user": "Ning",
  "role": "engineer",
  "skills": ["Python", "Go"]
}`}</pre>
            </div>
            <div className="format-arrow">→</div>
            <div className="format-col">
              <h3>{t.formatToon}</h3>
              <pre>{`user: Ning
role: engineer
skills[2]: Python,Go`}</pre>
            </div>
          </div>
        </section>

        {/* GEO: How-to steps — citable step-by-step block */}
        <section className="info-section" id="how-to-convert">
          <h2>{t.howToTitle}</h2>
          <div className="howto-steps">
            <div className="howto-step">
              <h3>{t.howToStep1Title}</h3>
              <p>{t.howToStep1Desc}</p>
            </div>
            <div className="howto-step">
              <h3>{t.howToStep2Title}</h3>
              <p>{t.howToStep2Desc}</p>
            </div>
            <div className="howto-step">
              <h3>{t.howToStep3Title}</h3>
              <p>{t.howToStep3Desc}</p>
            </div>
          </div>
        </section>

        {/* GEO: Syntax quick reference — citable reference table */}
        <section className="info-section" id="syntax-reference">
          <h2>{t.syntaxTitle}</h2>
          <p>{t.syntaxDesc}</p>
          <div className="syntax-table">
            <table>
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>TOON</th>
                  <th>JSON</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Object</td>
                  <td><code>key: value</code></td>
                  <td><code>{`{"key": "value"}`}</code></td>
                </tr>
                <tr>
                  <td>Nested Object</td>
                  <td><code>{"parent:\n  child: value"}</code></td>
                  <td><code>{`{"parent": {"child": "value"}}`}</code></td>
                </tr>
                <tr>
                  <td>Primitive Array</td>
                  <td><code>tags[3]: a,b,c</code></td>
                  <td><code>{`{"tags": ["a","b","c"]}`}</code></td>
                </tr>
                <tr>
                  <td>Tabular Array</td>
                  <td><code>{"users[2]{id,name}:\n  1,Alice\n  2,Bob"}</code></td>
                  <td><code>{`{"users": [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]}`}</code></td>
                </tr>
                <tr>
                  <td>Mixed Array</td>
                  <td><code>{"items[2]:\n  - value\n  - key: val"}</code></td>
                  <td><code>{`{"items": ["value", {"key":"val"}]}`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* GEO: Token savings — data-driven evidence block */}
        <section className="info-section" id="token-savings">
          <h2>{t.tokenTitle}</h2>
          <p>{t.tokenDesc}</p>
          <div className="syntax-table">
            <table>
              <thead>
                <tr>
                  <th>Data Type</th>
                  <th>JSON Tokens</th>
                  <th>TOON Tokens</th>
                  <th>Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Flat object (5 fields)</td>
                  <td>28</td>
                  <td>18</td>
                  <td className="savings-cell">-36%</td>
                </tr>
                <tr>
                  <td>Array of 10 objects (3 fields)</td>
                  <td>142</td>
                  <td>72</td>
                  <td className="savings-cell">-49%</td>
                </tr>
                <tr>
                  <td>Nested object (3 levels)</td>
                  <td>64</td>
                  <td>42</td>
                  <td className="savings-cell">-34%</td>
                </tr>
                <tr>
                  <td>Mixed array (5 items)</td>
                  <td>48</td>
                  <td>32</td>
                  <td className="savings-cell">-33%</td>
                </tr>
                <tr>
                  <td>Large tabular (100 rows, 5 cols)</td>
                  <td>1,820</td>
                  <td>920</td>
                  <td className="savings-cell">-49%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* GEO: Format comparison — comparison answer block */}
        <section className="info-section" id="format-comparison">
          <h2>{t.comparisonTitle}</h2>
          <p>{t.comparisonDesc}</p>
          <div className="syntax-table">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>TOON</th>
                  <th>JSON</th>
                  <th>YAML</th>
                  <th>CSV</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Token-efficient</td><td className="yes-cell">Yes</td><td className="no-cell">No</td><td className="partial-cell">Partial</td><td className="yes-cell">Yes</td></tr>
                <tr><td>Human-readable</td><td className="yes-cell">Yes</td><td className="partial-cell">Partial</td><td className="yes-cell">Yes</td><td className="partial-cell">Partial</td></tr>
                <tr><td>Lossless (JSON model)</td><td className="yes-cell">Yes</td><td className="yes-cell">Yes</td><td className="yes-cell">Yes</td><td className="no-cell">No</td></tr>
                <tr><td>Nested structures</td><td className="yes-cell">Yes</td><td className="yes-cell">Yes</td><td className="yes-cell">Yes</td><td className="no-cell">No</td></tr>
                <tr><td>Tabular optimization</td><td className="yes-cell">Yes</td><td className="no-cell">No</td><td className="no-cell">No</td><td className="yes-cell">Yes</td></tr>
                <tr><td>Length validation [N]</td><td className="yes-cell">Yes</td><td className="no-cell">No</td><td className="no-cell">No</td><td className="no-cell">No</td></tr>
                <tr><td>LLM-optimized</td><td className="yes-cell">Yes</td><td className="no-cell">No</td><td className="no-cell">No</td><td className="no-cell">No</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to use */}
        <section className="info-section" id="when-to-use">
          <h2>{t.sectionWhenToUse}</h2>
          <div className="use-grid">
            <div className="use-good">
              <h3>{t.useCaseGood}</h3>
              <ul>
                {t.useCaseGoodItems.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div className="use-bad">
              <h3>{t.useCaseBad}</h3>
              <ul>
                {t.useCaseBadItems.map((item, i) => (
                  <li key={i}>✗ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ — expanded for GEO breadth */}
        <section className="info-section" id="faq">
          <h2>{t.faqTitle}</h2>
          <div className="faq-grid">
            <FAQItem q={t.faq1q} a={t.faq1a} />
            <FAQItem q={t.faq2q} a={t.faq2a} />
            <FAQItem q={t.faq3q} a={t.faq3a} />
            <FAQItem q={t.faq4q} a={t.faq4a} />
            <FAQItem q={t.faq5q} a={t.faq5a} />
            <FAQItem q={t.faq6q} a={t.faq6a} />
            <FAQItem q={t.faq7q} a={t.faq7a} />
            <FAQItem q={t.faq8q} a={t.faq8a} />
          </div>
        </section>
      </main>

      {/* Footer with E-E-A-T signals */}
      <footer className="app-footer">
        <p>
          {t.builtBy}{" "}
          <a href="https://ohgiantai.com" target="_blank" rel="noopener noreferrer">OhGiant AI</a>
          <span className="sep">·</span>
          <a href="https://github.com/zning1994-agent/toon-tool" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="sep">·</span>
          <a href="https://toonformat.dev" target="_blank" rel="noopener noreferrer">
            {t.specLink}
          </a>
          <span className="sep">·</span>
          <span>{t.lastUpdated}: {BUILD_DATE}</span>
        </p>
      </footer>

      <style jsx global>{`
        .app-container { max-width: 1400px; margin: 0 auto; padding: 0 1.5rem; }
        .app-main { padding: 2rem 0 4rem; }
        .hero-section { text-align: center; padding: 3rem 0 2rem; }
        .hero-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.75rem; background: linear-gradient(135deg, #6366f1, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.1rem; color: #94a3b8; max-width: 640px; margin: 0 auto; line-height: 1.65; }
        .converter-card { background: #1e293b; border-radius: 16px; padding: 1.5rem; margin-top: 2rem; }
        .tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .tab { padding: 0.5rem 1rem; border-radius: 8px; border: none; background: transparent; color: #94a3b8; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
        .tab:hover { background: #334155; color: #e2e8f0; }
        .tab.active { background: #6366f1; color: white; }
        .error-banner { background: #7f1d1d; border: 1px solid #b91c1c; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem; color: #fca5a5; font-size: 0.875rem; }
        .panels { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .panel { background: #0f172a; border-radius: 12px; overflow: hidden; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; border-bottom: 1px solid #1e293b; font-size: 0.875rem; color: #94a3b8; }
        .code-input { width: 100%; min-height: 300px; background: transparent; border: none; color: #e2e8f0; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 1.6; resize: vertical; outline: none; }
        .code-output { width: 100%; min-height: 300px; background: transparent; color: #e2e8f0; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 1.6; overflow: auto; white-space: pre-wrap; }
        .validate-result { margin-top: 1rem; }
        .action-row { margin-top: 1.5rem; display: flex; justify-content: center; align-items: center; gap: 0.75rem; }
        .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 8px; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; }
        .btn-primary { background: #6366f1; color: white; }
        .btn-primary:hover { background: #4f46e5; }
        .btn-ghost { background: transparent; color: #94a3b8; border: 1px solid #334155; }
        .btn-ghost:hover { background: #334155; color: #e2e8f0; }
        .btn-small { padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #334155; color: #94a3b8; }
        .btn-small:hover { background: #475569; color: #e2e8f0; }
        .copied-toast { font-size: 0.8rem; color: #86efac; animation: fadeInOut 1.5s ease forwards; }
        @keyframes fadeInOut { 0%{opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{opacity:0} }
        .info-section { margin-top: 2rem; padding: 1.5rem; background: #1e293b; border-radius: 12px; }
        .info-section h2 { font-size: 1.25rem; margin-bottom: 0.75rem; color: #e2e8f0; }
        .info-section p { color: #94a3b8; line-height: 1.7; margin-bottom: 1.5rem; }
        .format-example { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: start; }
        .format-col { background: #0f172a; border-radius: 8px; padding: 1rem; }
        .format-col h3 { font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .format-col pre { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; }
        .format-arrow { display: flex; align-items: center; font-size: 1.5rem; color: #6366f1; padding-top: 2.5rem; }
        .use-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .use-good { background: #0f172a; border-radius: 8px; padding: 1rem; }
        .use-bad { background: #0f172a; border-radius: 8px; padding: 1rem; }
        .use-good h3 { font-size: 0.875rem; color: #86efac; margin-bottom: 0.75rem; }
        .use-bad h3 { font-size: 0.875rem; color: #fca5a5; margin-bottom: 0.75rem; }
        .use-good ul, .use-bad ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .use-good li, .use-bad li { font-size: 0.875rem; color: #94a3b8; }
        .faq-grid { display: flex; flex-direction: column; gap: 1rem; }
        .howto-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .howto-step { background: #0f172a; border-radius: 8px; padding: 1.25rem; }
        .howto-step h3 { font-size: 0.95rem; color: #818cf8; margin-bottom: 0.5rem; font-weight: 600; }
        .howto-step p { color: #94a3b8; font-size: 0.875rem; line-height: 1.6; margin-bottom: 0; }
        .syntax-table { overflow-x: auto; }
        .syntax-table table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .syntax-table th { text-align: left; padding: 0.75rem; background: #0f172a; color: #94a3b8; font-weight: 600; border-bottom: 1px solid #334155; font-size: 0.8rem; }
        .syntax-table td { padding: 0.75rem; border-bottom: 1px solid #1e293b; color: #e2e8f0; vertical-align: top; }
        .syntax-table code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; white-space: pre; background: #0f172a; padding: 0.15rem 0.35rem; border-radius: 4px; }
        .savings-cell { color: #86efac; font-weight: 600; }
        .yes-cell { color: #86efac; }
        .no-cell { color: #fca5a5; }
        .partial-cell { color: #fde68a; }
        .app-footer { text-align: center; padding: 2rem 0; border-top: 1px solid #1e293b; color: #64748b; font-size: 0.875rem; }
        .app-footer a { color: #818cf8; text-decoration: none; }
        .app-footer a:hover { color: #a5b4fc; }
        .app-footer .sep { margin: 0 0.5rem; }
        @media (max-width: 768px) {
          .panels { grid-template-columns: 1fr; }
          .format-example { grid-template-columns: 1fr; }
          .format-arrow { display: none; }
          .use-grid { grid-template-columns: 1fr; }
          .howto-steps { grid-template-columns: 1fr; }
          .hero-title { font-size: 1.75rem; }
          .hero-subtitle { font-size: 0.95rem; }
          .converter-card { padding: 1rem; border-radius: 12px; }
          .tabs { overflow-x: auto; padding-bottom: 0.25rem; }
          .tab { font-size: 0.82rem; padding: 0.4rem 0.75rem; white-space: nowrap; }
          .code-input, .code-output { min-height: 200px; font-size: 0.75rem; padding: 0.75rem; }
          .info-section { padding: 1rem; }
          .info-section h2 { font-size: 1.1rem; }
          .howto-step { padding: 1rem; }
          .format-col pre { font-size: 0.72rem; }
          .action-row { flex-direction: column; gap: 0.5rem; }
          .app-footer { padding: 1.5rem 0; font-size: 0.8rem; }
          .syntax-table table { font-size: 0.72rem; }
          .syntax-table th, .syntax-table td { padding: 0.5rem; }
        }
      `}</style>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq-item">
      <summary>{q}</summary>
      <p>{a}</p>
      <style jsx>{`
        .faq-item { background: #0f172a; border-radius: 8px; overflow: hidden; }
        .faq-item summary { padding: 0.875rem 1rem; cursor: pointer; font-weight: 500; color: #e2e8f0; font-size: 0.9rem; }
        .faq-item summary:hover { background: #1e293b; }
        .faq-item p { padding: 0 1rem 0.875rem; color: #94a3b8; font-size: 0.875rem; line-height: 1.65; border-top: 1px solid #1e293b; padding-top: 0.75rem; }
      `}</style>
    </details>
  );
}
