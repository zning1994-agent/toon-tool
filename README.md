# TOON Tool Ecosystem

**Developer tools for TOON (Token-Oriented Object Notation) — a compact, bracket-free encoding optimized for LLM prompts.**

## Live Demo

🔗 **https://toon-tool.ohgiantai.com/**

## All Tools

🔗 **[JSON-TOON Converter](https://toon-tool.ohgiantai.com/)** — Bidirectional JSON ↔ TOON converter with 10-language UI.

🔍 **[TOON Validator](https://toon-tool.ohgiantai.com/validator)** — Line-level TOON syntax checker with fix suggestions.

🧪 **[TOON Playground](https://toon-tool.ohgiantai.com/playground)** — Real-time split editor for TOON ↔ JSON preview.

📐 **[TOON Schema](https://toon-tool.ohgiantai.com/schema)** — Define types and validate TOON instances against schemas.

🔀 **[TOON Diff](https://toon-tool.ohgiantai.com/diff)** — Structural diff for two TOON files with key-level change tracking.

🖥️ **[toonjs CLI](https://github.com/zning1994-agent/toon-tool)** — Terminal tool for TOON ↔ JSON conversion, validation, and diff.

📦 **[toon-language (VS Code)](https://github.com/zning1994-agent/toon-tool/tree/main/vscode-extension)** — Syntax highlighting for `.toon` / `.toonl` files in VS Code.

## Other Languages / 其他语言

🇺🇸 English · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---

## What is TOON?

TOON (Token-Oriented Object Notation) is a compact, bracket-free encoding of JSON data designed for LLM prompts. It reduces token count by ~40% compared to standard JSON while remaining fully reversible.

## Features

- 🌐 **10 languages**: English, 简体中文, 繁體中文, 日本語, Français, Español, Deutsch, 한국어, Português, Русский
- 🔄 **Bidirectional conversion**: JSON ↔ TOON
- ✔️ **Validate**: Check TOON syntax and round-trip integrity
- 📋 **Browser-only**: No data sent to any server
- 📱 **Responsive**: Works on desktop and mobile
- 📦 **Tabular arrays**: Full support for TOON tabular array syntax
- 🔍 **SEO optimized**: JSON-LD, sitemap, robots.txt, Open Graph
- ⚡ **Fast**: Pure JavaScript, instant conversion

## TOON Syntax

### Object
```
name: Alice
age: 30
```

### Nested Object
```
user:
  name: Alice
  age: 30
```

### Inline Array (uniform primitives)
```
roles[2]: admin,user
```

### Tabular Array (uniform objects)
```
users[2]{id,name}:
  1,Alice
  2,Bob
```

### Mixed Array
```
items[3]:
  - 1
  - name: Alice
  - [2]: x,y
```

## Quick Example

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

## Tech Stack

- Next.js 14 (Static Export)
- TypeScript
- Pure client-side conversion (no backend)
- GitHub Pages deployment
- GitHub Actions CI/CD

## Development

```bash
# Web tools
cd web
npm install
npm run dev
npm run build

# CLI tools
cd ..
npm install
npm run build
node dist/index.js --help
```

## Spec

Based on the [TOON Format Specification](https://toonformat.dev).

## License

MIT
