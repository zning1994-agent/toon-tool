# JSON-TOON コンバーター

**JSON を TOON に変換 — LLM プロンプトに最適なコンパクトなエンコーディング。**

## デモ

🔗 **https://toon-tool.ohgiantai.com/**

## すべてのツール

🔗 **[JSON-TOON コンバーター](https://toon-tool.ohgiantai.com/)** — 双方向 JSON ↔ TOON コンバーター、10言語対応。

🔍 **[TOON バリデーター](https://toon-tool.ohgiantai.com/validator)** — 行レベルの TOON 構文チェッカー、修正提案付き。

🧪 **[TOON Playground](https://toon-tool.ohgiantai.com/playground)** — TOON ↔ JSON リアルタイム分割エディター。

📐 **[TOON Schema](https://toon-tool.ohgiantai.com/schema)** — タイプ定義と TOON インスタンスのバリデーション。

🔀 **[TOON Diff](https://toon-tool.ohgiantai.com/diff)** — 構造化 diff、キー単位の変更追跡。

🖥️ **[toonjs CLI](https://github.com/zning1994-agent/toon-tool)** — ターミナルツール：TOON ↔ JSON 変換、バリデーション、diff。

📦 **[toon-language (VS Code)](https://github.com/zning1994-agent/toon-tool/tree/main/vscode-extension)** — `.toon` / `.toonl` ファイルの VS Code 構文ハイライト。

## Other Languages / 其他语言

🇺🇸 English · [🇨🇳 简体中文](README_CN.md) · 🇯🇵 日本語 · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---

## TOON とは？

TOON（Token-Oriented Object Notation）は、LLM プロンプト向けに設計されたコンパクトなブラケットフリーの JSON エンコーディングです。標準 JSON と比較してトークン数を約 40% 削減し、完全に可逆的です。

## 機能

- 🌐 **10言語対応**：英語、简体中文、繁體中文、日本語、フランス語、スペイン語、ドイツ語、韓国語、ポルトガル語、ロシア語
- 🔄 **双方向変換**：JSON ↔ TOON
- ✔️ **検証**：TOON 構文と往返変換の整合性をチェック
- 📋 **ブラウザ内のみ**：データは一切サーバーに送信されません
- 📱 **レスポンシブ**：デスクトップとモバイルに対応
- 📦 **テーブル配列**：TOON テーブル配列構文を完全サポート
- 🔍 **SEO 最適化**：JSON-LD、sitemap、robots.txt、Open Graph
- ⚡ **高速**：Pure JavaScript、瞬時変換

## TOON 構文

### オブジェクト
```
name: Alice
age: 30
```

### ネストオブジェクト
```
user:
  name: Alice
  age: 30
```

### インライン配列（同種プリミティブ）
```
roles[2]: admin,user
```

### テーブル配列（同種オブジェクト）
```
users[2]{id,name}:
  1,Alice
  2,Bob
```

### 混合配列
```
items[3]:
  - 1
  - name: Alice
  - [2]: x,y
```

## クイック例

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

## 技術スタック

- Next.js 14（静的エクスポート）
- TypeScript
- ピュアクライアント変換（バックエンド不要）
- GitHub Pages デプロイ
- GitHub Actions CI/CD

## 開発

```bash
# Web ツール
cd web
npm install
npm run dev
npm run build

# CLI ツール
cd ..
npm install
npm run build
node dist/index.js --help
```

## 仕様

[TOON フォーマット仕様](https://toonformat.dev) に基づきます。

## ライセンス

MIT
