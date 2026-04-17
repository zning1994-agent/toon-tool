"use client";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import LangSwitcher from "@/components/LangSwitcher";

const TOOLS = [
  { href: "/", label: "Converter" },
  { href: "/validator", label: "Validator" },
  { href: "/playground", label: "Playground" },
  { href: "/schema", label: "Schema" },
  { href: "/diff", label: "Diff" },
];

export default function SiteHeader() {
  const { t, lang } = useLang();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="header-logo">
          <div className="header-logo-icon">{}</div>
          <span className="header-logo-text">{t.appName}</span>
        </Link>

        <nav className="header-nav">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="header-nav-link"
            >
              {tool.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LangSwitcher currentLang={lang} />
          <a
            href="https://github.com/zning1994-agent/toon-tool"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <style jsx global>{`
        .site-header {
          border-bottom: 1px solid #1e293b;
          position: sticky;
          top: 0;
          background: #0f172a;
          z-index: 100;
        }
        .header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          height: 60px;
        }
        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .header-logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #6366f1, #818cf8);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          color: white;
        }
        .header-logo-text {
          font-size: 1rem;
          font-weight: 600;
          color: #e2e8f0;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
        }
        .header-nav-link {
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.15s;
        }
        .header-nav-link:hover {
          background: #1e293b;
          color: #e2e8f0;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          text-decoration: none;
        }
        .btn-ghost {
          background: transparent;
          color: #94a3b8;
          border: 1px solid #334155;
        }
        .btn-ghost:hover {
          background: #334155;
          color: #e2e8f0;
        }
        @media (max-width: 768px) {
          .header-nav { display: none; }
          .header-logo-text { display: none; }
        }
      `}</style>
    </header>
  );
}
