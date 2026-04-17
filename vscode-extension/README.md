# TOON Language — VS Code Extension

TOON（Token-Oriented Object Notation）语法高亮插件。

## 安装

### 从源码安装

```bash
# 克隆
git clone https://github.com/zning1994/toon-tool.git
cd toon-tool/vscode-extension

# 复制到 VS Code 扩展目录
# macOS
cp -r . ~/.vscode/extensions/toon-language
# Linux
cp -r . ~/.vscode/extensions/toon-language
# Windows
xcopy /E . %USERPROFILE%\.vscode\extensions\toon-language\
```

然后 Reload Window: `Ctrl+Shift+P` → "Developer: Reload Window"

### 或者 .vsix 安装

```bash
# 打包
npm install -g @vscode/vsce
vsce package
code --install-extension toon-language.vsix
```

## 功能

- ✨ `.toon` / `.toonl` 文件语法高亮
- 🏷️ Key 高亮（行首）
- 💡 字符串、引号、转义字符
- 🔢 数字（整数、浮点、科学计数法）
- ✅ `true` / `false` / `null` 关键字
- 📐 `key[n]` 数组大小标注
- # 行注释高亮

## TOON 文件示例

```
# Repository config
name: toon-tool
url: https://github.com/zning1994/toon-tool
stars: 42
fork: true
languages[3]:
  JavaScript, TypeScript, Python
  Rust, Go
  C++, Java
tags:
  (json toon converter parser)
config:
  debug: true
  port: 3000
```

## 快捷键

打开 `.toon` 文件，VS Code 会自动识别语言并应用高亮。

## 关联语言

打开任意 `.toon` 文件，按 `Ctrl+Shift+P` → "Change Language Mode" → 选择 "TOON"。

## 发布记录

- **0.1.0** — 初始版本：基础语法高亮
