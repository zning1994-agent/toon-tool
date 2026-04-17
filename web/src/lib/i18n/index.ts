import { en } from "./en";
import { zhCN } from "./zh-CN";
import { zhTW } from "./zh-TW";
import { ja } from "./ja";
import { fr } from "./fr";
import { es } from "./es";
import { de } from "./de";
import { ko } from "./ko";
import { pt } from "./pt";
import { ru } from "./ru";

export type Lang = "en" | "zh-CN" | "zh-TW" | "ja" | "fr" | "es" | "de" | "ko" | "pt" | "ru";
export type Translations = typeof en;

export const translations: Record<Lang, Translations> = {
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  ja,
  fr,
  es,
  de,
  ko,
  pt,
  ru,
};

export const langNames: Record<Lang, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  ko: "한국어",
  pt: "Português",
  ru: "Русский",
};

export const langFlag: Record<Lang, string> = {
  en: "🇺🇸",
  "zh-CN": "🇨🇳",
  "zh-TW": "🇹🇼",
  ja: "🇯🇵",
  fr: "🇫🇷",
  es: "🇪🇸",
  de: "🇩🇪",
  ko: "🇰🇷",
  pt: "🇧🇷",
  ru: "🇷🇺",
};

export const defaultLang: Lang = "en";
