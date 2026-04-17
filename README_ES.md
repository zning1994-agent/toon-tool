# Convertidor JSON-TOON

**Convierte JSON a TOON — una codificación compacta y sin corchetes, optimizada para prompts LLM.**

## ¿Qué es TOON?

TOON (Token-Oriented Object Notation) es una codificación compacta y sin corchetes de datos JSON, diseñada para prompts LLM. Reduce el número de tokens en ~40% comparado con JSON estándar, siendo completamente reversible.

## Demo en vivo

🔗 **https://toon-tool.ohgiantai.com/**


## Other Languages / 其他语言

[🇺🇸 English](README.md) · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · 🇪🇸 Español · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---

## Características

- 🌐 **5 idiomas**: Inglés, Chino Simplificado, Chino Tradicional, Japonés, Francés
- 🔄 **Conversión bidireccional**: JSON ↔ TOON
- ✔️ **Validación**: Verifica sintaxis TOON e integridad de ida y vuelta
- 📋 **Solo navegador**: No se envía ningún dato al servidor
- 📱 **Responsive**: Funciona en escritorio y móvil
- 📦 **Arrays tabulares**: Soporte completo de la sintaxis de arrays tabulares TOON
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

## Stack tecnológico

- Next.js 14 (Exportación estática)
- TypeScript
- Conversión puramente en cliente (sin backend)
- Despliegue en GitHub Pages

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

## Especificación

Basado en la [Especificación del Formato TOON](https://toonformat.dev).

## Licencia

MIT
