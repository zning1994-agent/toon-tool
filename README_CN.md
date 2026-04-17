# JSON-TOON 转换器

**将 JSON 转换为 TOON — 紧凑、无括号的编码格式，专为 LLM 提示词优化。**

## 什么是 TOON？

TOON（Token-Oriented Object Notation）是一种紧凑、无括号的 JSON 数据编码，专为 LLM 提示词设计。相比标准 JSON 可减少约 40% 的 token，且完全可逆。

## 在线演示

🔗 **https://toon-tool.ohgiantai.com/**

## Other Languages / 其他语言

[🇺🇸 English](README.md) · 🇨🇳 简体中文 · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---
## 功能特点

- 🌐 **5 种语言**：英语、简体中文、繁体中文、日语、法语
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

## 开发

```bash
npm install
npm run dev
npm run build
```

## 规范

基于 [TOON 格式规范](https://toonformat.dev)。

## 开源协议

MIT
