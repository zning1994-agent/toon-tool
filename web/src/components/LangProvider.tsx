"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, translations, defaultLang, Translations } from "@/lib/i18n";

interface LangContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: defaultLang,
  t: translations[defaultLang],
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("toon-lang") as Lang | null;
    if (saved && saved in translations) {
      setLangState(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language;
      if (browserLang.startsWith("zh")) {
        if (browserLang === "zh-TW" || browserLang === "zh-HK") setLangState("zh-TW");
        else setLangState("zh-CN");
      } else if (browserLang.startsWith("ja")) setLangState("ja");
      else if (browserLang.startsWith("fr")) setLangState("fr");
      else setLangState("en");
    }
    setMounted(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("toon-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
