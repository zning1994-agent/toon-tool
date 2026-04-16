# toon-tool

TOON (Token-Oriented Object Notation) 工具生态。

## 工具列表

| 工具 | 说明 |
|------|------|
| [toonjs CLI](https://github.com/zning1994-agent/toon-tool) | 终端 CLI：转换、验证、diff |
| [toon-language](vscode-extension) | VS Code 语法高亮插件 |
| [JSON-TOON Converter](https://json-toon-converter.ohgiantai.com/) | Web 双向转换器 |
| [TOON Validator](https://json-toon-converter.ohgiantai.com/validator) | Web 语法检查器 |
| [TOON Playground](https://json-toon-converter.ohgiantai.com/playground) | Web 实时代码实验室 |

## toonjs CLI

终端工具。

```bash
# 直接运行（通过 GitHub）
npx github:zning1994-agent/toon-tool tojson input.toon
npx github:zning1994-agent/toon-tool json input.json
npx github:zning1994-agent/toon-tool validate config.toon
npx github:zning1994-agent/toon-tool diff a.toon b.toon

# stdin 管道
echo "name: test" | npx github:zning1994-agent/toon-tool tojson
```

构建：
```bash
npm install
npm run build
node dist/index.js --help
```

## toon-language (VS Code 扩展)

VS Code 语法高亮插件，支持 `.toon` / `.toonl` 文件。

安装：
```bash
# 源码安装：复制到 ~/.vscode/extensions/toon-language
# 或
code --install-extension vscode-extension/toon-language-0.1.0.vsix
```

## TOON 格式说明

TOON 是一种紧凑的、括号无关的 JSON 编码格式。

```
name: GitHub
url: https://github.com
stars: 42000
fork: true
languages[3]:
  JavaScript, Python, Go
  Rust, TypeScript
  C++, Java
tags:
  (json toon converter)
```

详见：[toonformat.dev](https://toonformat.dev/reference/spec.html)
