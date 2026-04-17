# TOON Tool Ecosystem

**Herramientas para desarrolladores de TOON (Token-Oriented Object Notation) — una codificación compacta y sin paréntesis, optimizada para prompts de LLM.**

## Demo en vivo

🔗 **https://toon-tool.ohgiantai.com/**

## Todas las herramientas

🔗 **[JSON-TOON Converter](https://toon-tool.ohgiantai.com/)** — Conversor bidireccional JSON ↔ TOON con interfaz en 10 idiomas.

🔍 **[TOON Validator](https://toon-tool.ohgiantai.com/validator)** — Verificador de sintaxis TOON a nivel de línea con sugerencias de corrección.

🧪 **[TOON Playground](https://toon-tool.ohgiantai.com/playground)** — Editor dividido en tiempo real para previsualización TOON ↔ JSON.

📐 **[TOON Schema](https://toon-tool.ohgiantai.com/schema)** — Define tipos y valida instancias TOON contra schemas.

🔀 **[TOON Diff](https://toon-tool.ohgiantai.com/diff)** — Comparación estructural de archivos con seguimiento de cambios por clave.

🖥️ **[toonjs CLI](https://github.com/zning1994-agent/toon-tool)** — Herramienta de terminal: conversión, validación y diff TOON ↔ JSON.

📦 **[toon-language (VS Code)](https://github.com/zning1994-agent/toon-tool/tree/main/vscode-extension)** — Resaltado de sintaxis para archivos `.toon` / `.toonl` en VS Code.

## Other Languages / 其他语言

🇺🇸 English · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · 🇪🇸 Español · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---

## ¿Qué es TOON?

TOON (Token-Oriented Object Notation) es una codificación compacta y sin paréntesis de datos JSON, diseñada para prompts de LLM. Reduce el número de tokens en ~40% comparado con JSON estándar, siendo completamente reversible.

## Características

- 🌐 **10 idiomas**: inglés, 简体中文, 繁體中文, 日本語, Français, Español, Deutsch, 한국어, Português, Русский
- 🔄 **Conversión bidireccional**: JSON ↔ TOON
- ✔️ **Validación**: Verifica la sintaxis TOON y la integridad de conversión round-trip
- 📋 **Solo navegador**: Ningún dato se envía a ningún servidor
- 📱 **Responsive**: Funciona en escritorio y móvil
- 📦 **Arrays tabulares**: Soporte completo para la sintaxis de arrays tabulares de TOON
- 🔍 **SEO optimizado**: JSON-LD, sitemap, robots.txt, Open Graph
- ⚡ **Rápido**: JavaScript puro, conversión instantánea

## Sintaxis TOON

### Objeto
```
name: Alice
age: 30
```

### Objeto anidado
```
user:
  name: Alice
  age: 30
```

### Array en línea (primitivos uniformes)
```
roles[2]: admin,user
```

### Array tabular (objetos uniformes)
```
users[2]{id,name}:
  1,Alice
  2,Bob
```

### Array mixto
```
items[3]:
  - 1
  - name: Alice
  - [2]: x,y
```

## Ejemplo rápido

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

## Pila tecnológica

- Next.js 14 (Exportación estática)
- TypeScript
- Conversión puramente en cliente (sin backend)
- Despliegue en GitHub Pages
- CI/CD con GitHub Actions

## Desarrollo

```bash
# Herramientas web
cd web
npm install
npm run dev
npm run build

# Herramientas CLI
cd ..
npm install
npm run build
node dist/index.js --help
```

## Especificación

Basado en la [Especificación de formato TOON](https://toonformat.dev).

## Licencia

MIT
