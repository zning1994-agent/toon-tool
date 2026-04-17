# Ecossistema TOON Tool

**Ferramentas para desenvolvedores de TOON (Token-Oriented Object Notation) — uma codificação compacta e sem parênteses, otimizada para prompts de LLM.**

## Demo ao vivo

🔗 **https://toon-tool.ohgiantai.com/**

## Todas as ferramentas

🔗 **[JSON-TOON Converter](https://toon-tool.ohgiantai.com/)** — Conversor bidirecional JSON ↔ TOON com interface em 10 idiomas.

🔍 **[TOON Validator](https://toon-tool.ohgiantai.com/validator)** — Verificador de sintaxe TOON a nível de linha com sugestões de correção.

🧪 **[TOON Playground](https://toon-tool.ohgiantai.com/playground)** — Editor dividido em tempo real para visualização TOON ↔ JSON.

📐 **[TOON Schema](https://toon-tool.ohgiantai.com/schema)** — Define tipos e valida instâncias TOON contra schemas.

🔀 **[TOON Diff](https://toon-tool.ohgiantai.com/diff)** — Comparação estrutural de arquivos com rastreamento de alterações por chave.

🖥️ **[toonjs CLI](https://github.com/zning1994-agent/toon-tool)** — Ferramenta de terminal: conversão, validação e diff TOON ↔ JSON.

📦 **[toon-language (VS Code)](https://github.com/zning1994-agent/toon-tool/tree/main/vscode-extension)** — Destaque de sintaxe para arquivos `.toon` / `.toonl` no VS Code.

## Other Languages / 其他语言

🇺🇸 English · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · 🇧🇷 Português · [🇷🇺 Русский](README_RU.md)

---

## O que é TOON?

TOON (Token-Oriented Object Notation) é uma codificação compacta e sem parênteses de dados JSON, projetada para prompts de LLM. Reduz o número de tokens em ~40% em comparação com JSON padrão, sendo completamente reversível.

## Funcionalidades

- 🌐 **10 idiomas**: inglês, 简体中文, 繁體中文, 日本語, Français, Español, Deutsch, 한국어, Português, Русский
- 🔄 **Conversão bidirecional**: JSON ↔ TOON
- ✔️ **Validação**: Verifica sintaxe TOON e integridade round-trip
- 📋 **Apenas navegador**: Nenhum dado é enviado a nenhum servidor
- 📱 **Responsivo**: Funciona em desktop e mobile
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

## Pilha tecnológica

- Next.js 14 (Exportação estática)
- TypeScript
- Conversão puramente no cliente (sem backend)
- Deploy no GitHub Pages
- CI/CD com GitHub Actions

## Desenvolvimento

```bash
# Ferramentas web
cd web
npm install
npm run dev
npm run build

# Ferramentas CLI
cd ..
npm install
npm run build
node dist/index.js --help
```

## Especificação

Baseado na [Especificação de formato TOON](https://toonformat.dev).

## Licença

MIT
