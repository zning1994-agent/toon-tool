# TOON 工具生态

**TOON（Token-Oriented Object Notation）开发者工具 — 紧凑、无括号的编码格式，专为 LLM 提示词优化。**

## 在线演示

🔗 **https://toon-tool.ohgiantai.com/**

## 所有工具

🔗 **[JSON-TOON 转换器](https://toon-tool.ohgiantai.com/)** — 双向 JSON ↔ TOON 转换器，支持 10 种语言界面。

🔍 **[TOON 语法检查器](https://toon-tool.ohgiantai.com/validator)** — 行级语法检查，附带修复建议。

🧪 **[TOON Playground](https://toon-tool.ohgiantai.com/playground)** — 实时分屏编辑器，TOON ↔ JSON 同步预览。

📐 **[TOON Schema](https://toon-tool.ohgiantai.com/schema)** — 定义类型并根据 Schema 校验 TOON 数据。

🔀 **[TOON Diff](https://toon-tool.ohgiantai.com/diff)** — 结构化文件对比工具，逐 key 追踪变更。

🖥️ **[toonjs CLI](https://github.com/zning1994-agent/toon-tool)** — 终端工具：TOON ↔ JSON 转换、校验、diff。

📦 **[toon-language (VS Code)](https://github.com/zning1994-agent/toon-tool/tree/main/vscode-extension)** — VS Code 语法高亮插件，支持 `.toon` / `.toonl` 文件。

## Other Languages / 其他语言

🇺🇸 English · 🇨🇳 简体中文 · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---

## 什么是 TOON？

TOON（Token-Oriented Object Notation）是一种紧凑、无括号的 JSON 数据编码，专为 LLM 提示词设计。相比标准 JSON 可减少约 40% 的 token，且完全可逆。

## 功能特点

- 🌐 **10 种语言**：英语、简体中文、繁體中文、日語、法語、西班牙語、德語、韓語、葡萄牙語、俄語
- 🔄 **双向转换**：JSON ↔ TOON
- ✔️ **格式校验**：验证 TOON 语法和往返转换完整性
- 📋 **纯浏览器运行**：数据不会发送到任何服务器
- 📱 **响应式设计**：适配桌面和移动端
- 📦 **表格数组**：完整支持 TOON 表格数组语法
- 🔍 **SEO 优化**：JSON-LD、sitemap、robots.txt、Open Graph
- ⚡ **即时转换**：纯 JavaScript，快速高效

## TOON 语法

### 普通对象
```
name: Alice
age: 30
```

### 嵌套对象
```
user:
  name: Alice
  age: 30
```

### 内联数组（同类原始值）
```
roles[2]: admin,user
```

### 表格数组（同类对象）
```
users[2]{id,name}:
  1,Alice
  2,Bob
```

### 混合数组
```
items[3]:
  - 1
  - name: Alice
  - [2]: x,y
```

## 快速示例

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

## 技术栈

- Next.js 14（静态导出）
- TypeScript
- 纯前端转换（无后端）
- GitHub Pages 部署
- GitHub Actions CI/CD

## 开发

```bash
# Web 工具
cd web
npm install
npm run dev
npm run build

# CLI 工具
cd ..
npm install
npm run build
node dist/index.js --help
```

## 规范

基于 [TOON 格式规范](https://toonformat.dev)。

## 开源协议

MIT
