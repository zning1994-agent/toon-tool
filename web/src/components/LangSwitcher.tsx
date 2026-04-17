"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Lang, langNames, langFlag, defaultLang } from "@/lib/i18n";

interface Props {
  currentLang: Lang;
}

export default function LangSwitcher({ currentLang }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const switchLang = (lang: Lang) => {
    setOpen(false);
    // The pathname is just "/" in this static export
    // Store the lang preference in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("toon-lang", lang);
    }
    // Force re-render by navigating
    router.refresh();
  };

  return (
    <div className="lang-switcher">
      <button className="lang-btn" onClick={() => setOpen(!open)} aria-label="Switch language">
        <span className="lang-flag">{langFlag[currentLang]}</span>
        <span className="lang-name">{langNames[currentLang]}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="lang-dropdown">
          {(Object.keys(langNames) as Lang[]).map((lang) => (
            <button
              key={lang}
              className={`lang-option ${lang === currentLang ? "active" : ""}`}
              onClick={() => switchLang(lang)}
            >
              <span className="lang-flag">{langFlag[lang]}</span>
              <span>{langNames[lang]}</span>
            </button>
          ))}
        </div>
      )}
      <style jsx>{`
        .lang-switcher { position: relative; }
        .lang-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.35rem 0.65rem; border-radius: 6px;
          background: transparent; border: 1px solid #334155;
          color: #94a3b8; cursor: pointer; font-size: 0.8rem;
          transition: all 0.2s;
        }
        .lang-btn:hover { background: #334155; color: #e2e8f0; }
        .lang-flag { font-size: 1rem; }
        .lang-name { font-weight: 500; }
        .lang-dropdown {
          position: absolute; top: calc(100% + 4px); right: 0;
          background: #1e293b; border: 1px solid #334155;
          border-radius: 8px; padding: 0.25rem; min-width: 130px;
          z-index: 100; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .lang-option {
          display: flex; align-items: center; gap: 0.5rem;
          width: 100%; padding: 0.4rem 0.6rem; border-radius: 5px;
          border: none; background: transparent; color: #94a3b8;
          cursor: pointer; font-size: 0.8rem; text-align: left;
          transition: all 0.15s;
        }
        .lang-option:hover { background: #334155; color: #e2e8f0; }
        .lang-option.active { background: #6366f1; color: white; }
      `}</style>
    </div>
  );
}
