# TOON-Tool-Ökosystem

**Entwicklertools für TOON (Token-Oriented Object Notation) — eine kompakte, klammerfreie Kodierung, optimiert für LLM-Prompts.**

## Live-Demo

🔗 **https://toon-tool.ohgiantai.com/**

## Alle Tools

🔗 **[JSON-TOON Converter](https://toon-tool.ohgiantai.com/)** — Bidirektionaler JSON ↔ TOON Konverter mit 10-Sprachen-Benutzeroberfläche.

🔍 **[TOON Validator](https://toon-tool.ohgiantai.com/validator)** — Zeilenbasierter TOON-Syntaxprüfer mit Korrekturvorschlägen.

🧪 **[TOON Playground](https://toon-tool.ohgiantai.com/playground)** — Echtzeit-Editor mit geteilter Ansicht für TOON ↔ JSON Vorschau.

📐 **[TOON Schema](https://toon-tool.ohgiantai.com/schema)** — Typdefinitionen und TOON-Instanzvalidierung gegen Schemas.

🔀 **[TOON Diff](https://toon-tool.ohgiantai.com/diff)** — Struktureller Dateivergleich mit schlüsselbasierter Änderungsverfolgung.

🖥️ **[toonjs CLI](https://github.com/zning1994-agent/toon-tool)** — Terminal-Tool: TOON ↔ JSON Konvertierung, Validierung und Diff.

📦 **[toon-language (VS Code)](https://github.com/zning1994-agent/toon-tool/tree/main/vscode-extension)** — Syntaxhervorhebung für `.toon` / `.toonl` Dateien in VS Code.

## Other Languages / 其他语言

🇺🇸 English · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · 🇩🇪 Deutsch · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---

## Was ist TOON?

TOON (Token-Oriented Object Notation) ist eine kompakte, klammerfreie Kodierung von JSON-Daten, die für LLM-Prompts entwickelt wurde. Sie reduziert die Tokenanzahl um ~40% im Vergleich zu Standard-JSON und ist vollständig umkehrbar.

## Funktionen

- 🌐 **10 Sprachen**: Englisch, 简体中文, 繁體中文, 日本語, Français, Español, Deutsch, 한국어, Português, Русский
- 🔄 **Bidirektionale Konvertierung**: JSON ↔ TOON
- ✔️ **Validierung**: TOON-Syntax und Round-Trip-Integrität prüfen
- 📋 **Nur Browser**: Keine Daten werden an einen Server gesendet
- 📱 **Responsive**: Funktioniert auf Desktop und Mobilgeräten
- 📦 **Tabellenarrays**: Vollständige Unterstützung für TOON-Tabellenarray-Syntax
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

### Tabellenarray (einheitliche Objekte)
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

## Technologie-Stack

- Next.js 14 (Statischer Export)
- TypeScript
- Rein clientseitige Konvertierung (kein Backend)
- GitHub Pages Deployment
- GitHub Actions CI/CD

## Entwicklung

```bash
# Web-Tools
cd web
npm install
npm run dev
npm run build

# CLI-Tools
cd ..
npm install
npm run build
node dist/index.js --help
```

## Spezifikation

Basierend auf der [TOON-Formatspezifikation](https://toonformat.dev).

## Lizenz

MIT
