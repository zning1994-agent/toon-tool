# JSON-TOON コンバーター

**JSON を TOON に変換 — LLM プロンプトに最適なコンパクトなエンコーディング。**

## TOON とは？

TOON（Token-Oriented Object Notation）は、LLM プロンプト向けに設計されたコンパクトなブラケットフリーの JSON エンコーディングです。標準 JSON と比較してトークン数を約 40% 削減し、完全に可逆的です。

## デモ

🔗 **https://toon-tool.ohgiantai.com/**


## Other Languages / 其他语言

[🇺🇸 English](README.md) · [🇨🇳 简体中文](README_CN.md) · 🇯🇵 日本語 · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---

## 機能

- 🌐 **5言語対応**：英語、中国語簡体字、中国語繁体字、日本語、フランス語
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

## 開発

```bash
npm install
npm run dev
npm run build
```

## 仕様

[TOON フォーマット仕様](https://toonformat.dev) に基づきます。

## ライセンス

MIT
