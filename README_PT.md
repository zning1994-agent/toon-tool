# Conversor JSON-TOON

**Converta JSON para TOON — uma codificação compacta e sem parênteses, otimizada para prompts LLM.**

## O que é TOON?

TOON (Token-Oriented Object Notation) é uma codificação compacta e sem parênteses de dados JSON, projetada para prompts LLM. Reduz o número de tokens em ~40% comparado ao JSON padrão, sendo completamente reversível.

## Demonstração ao vivo

🔗 **https://toon-tool.ohgiantai.com/**

## Other Languages / 其他语言

[🇺🇸 English](README.md) · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · 🇧🇷 Português · [🇷🇺 Русский](README_RU.md)

---
## Recursos

- 🌐 **5 idiomas**: Inglês, Chinês Simplificado, Chinês Tradicional, Japonês, Francês
- 🔄 **Conversão bidirecional**: JSON ↔ TOON
- ✔️ **Validação**: Verifica sintaxe TOON e integridade de ida e volta
- 📋 **Apenas navegador**: Nenhum dado é enviado ao servidor
- 📱 **Responsivo**: Funciona em desktop e móvil
- 📦 **Arrays tabulares**: Suporte completo para sintaxe de arrays tabulares TOON
- 🔍 **SEO otimizado**: JSON-LD, sitemap, robots.txt, Open Graph
- ⚡ **Rápido**: JavaScript puro, conversão instantânea

## Sintaxe TOON

### Objeto
```
name: Alice
age: 30
```

### Objeto aninhado
```
user:
  name: Alice
  age: 30
```

### Array em linha (primitivos uniformes)
```
roles[2]: admin,user
```

### Array tabular (objetos uniformes)
```
users[2]{id,name}:
  1,Alice
  2,Bob
```

### Array misto
```
items[3]:
  - 1
  - name: Alice
  - [2]: x,y
```

## Exemplo rápido

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

- Next.js 14 (Exportação estática)
- TypeScript
- Conversão puramente no cliente (sem backend)
- Deploy no GitHub Pages

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
```

## Especificação

Baseado na [Especificação do Formato TOON](https://toonformat.dev).

## Licença

MIT
