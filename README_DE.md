# JSON-TOON Konverter

**Konvertiere JSON zu TOON — eine kompakte, klammerfreie Kodierung, optimiert für LLM-Prompts.**

## Was ist TOON?

TOON (Token-Oriented Object Notation) ist eine kompakte, klammerfreie Kodierung von JSON-Daten, die für LLM-Prompts entwickelt wurde. Sie reduziert die Token-Anzahl um ~40% im Vergleich zu Standard-JSON und ist vollständig umkehrbar.

## Live-Demo

🔗 **https://toon-tool.ohgiantai.com/**

## Other Languages / 其他语言

[🇺🇸 English](README.md) · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · 🇩🇪 Deutsch · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---
## Funktionen

- 🌐 **5 Sprachen**: Englisch, Vereinfachtes Chinesisch, Traditionelles Chinesisch, Japanisch, Französisch
- 🔄 **Bidirektionale Konvertierung**: JSON ↔ TOON
- ✔️ **Validierung**: TOON-Syntax und Round-Trip-Integrität prüfen
- 📋 **Nur Browser**: Keine Daten werden an einen Server gesendet
- 📱 **Responsive**: Funktioniert auf Desktop und Mobilgeräten
- 📦 **Tabellen-Arrays**: Vollständige Unterstützung der TOON-Tabellen-Array-Syntax
- 🔍 **SEO-optimiert**: JSON-LD, sitemap, robots.txt, Open Graph
- ⚡ **Schnell**: Reines JavaScript, sofortige Konvertierung

## TOON-Syntax

### Objekt
```
name: Alice
age: 30
```

### Verschachteltes Objekt
```
user:
  name: Alice
  age: 30
```

### Inline-Array (einheitliche Primitive)
```
roles[2]: admin,user
```

### Tabellen-Array (einheitliche Objekte)
```
users[2]{id,name}:
  1,Alice
  2,Bob
```

### Gemischtes Array
```
items[3]:
  - 1
  - name: Alice
  - [2]: x,y
```

## Schnelles Beispiel

**JSON:**
```json
{
  "user": "Ning",
  "role": "engineer",
  "skills": ["Python", "Go"]
}
```

**TOON:**
```
user: Ning
role: engineer
skills[2]: Python,Go
```

## Tech-Stack

- Next.js 14 (Statischer Export)
- TypeScript
- Rein clientseitige Konvertierung (kein Backend)
- GitHub Pages Deployment

## Entwicklung

```bash
npm install
npm run dev
npm run build
```

## Spezifikation

Basierend auf der [TOON-Formatspezifikation](https://toonformat.dev).

## Lizenz

MIT
