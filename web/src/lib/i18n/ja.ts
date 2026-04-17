export const ja = {
  appName: "JSON-TOON コンバーター",
  appDescription:
    "JSON を TOON（Token-Oriented Object Notation）に変換 — LLM プロンプトに特化したコンパクトなフォーマット。サーバー不要、ブラウザのみで動作。",

  heroTitle: "JSON-TOON コンバーター",
  heroSubtitle:
    "JSON を TOON に変換 — LLM プロンプトに最適なコンパクトなエンコーディング。トークン約40%削減、完全逆変換可能、ブラウザで即座に動作。",

  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "検証",

  panelJsonInput: "JSON 入力",
  panelToonOutput: "TOON 出力",
  panelToonInput: "TOON 入力",
  panelJsonOutput: "JSON 出力",
  panelJsonData: "JSON データ",
  panelToonExpected: "TOON（期待値）",
  panelValidationResult: "検証結果",

  btnCopy: "コピー",
  btnLoadSample: "サンプル読み込み",
  btnConvertToToon: "TOON に変換",
  btnConvertToJson: "JSON に変換",
  btnValidate: "検証",

  errorInvalidJson: "JSON 構文が無効です",
  errorInvalidToon: "TOON 構文が無効です",
  errorParse: "解析エラー",

  validationRoundTrip: "JSON → TOON → JSON 往返変換",
  validationPass: "成功",
  validationFail: "失敗",
  validationStatus: "検証ステータス",
  validationValid: "有効な TOON",
  validationInvalid: "無効",

  sectionWhatIsToon: "TOON とは？",
  sectionWhatIsToonDesc:
    "TOON（Token-Oriented Object Notation）は、LLM プロンプト向けに設計されたコンパクトなブラケットフリーの JSON データエンコーディングです。インデントでネストを表現し、標準 JSON と比較してトークン数を約40%削減します。TOON は完全に可逆的で、JSON に无损に戻せます。",
  formatJson: "JSON",
  formatToon: "TOON",

  sectionWhenToUse: "TOON の利用シーン",
  useCaseGood: "最適なシーン",
  useCaseBad: "不向きなシーン",
  useCaseGoodItems: [
    "LLM への構造化データ入力",
    "均一なオブジェクト配列",
    "トークンコスト削減",
    "構造検証の追加",
  ],
  useCaseBadItems: [
    "深いネスト構造",
    "混成非均一配列",
    "遅延が重要なパス",
  ],

  footerTagline: "JSON-TOON — オープンソース、ブラウザで動作。",

  navGithub: "GitHub",

  copied: "コピーしました！",

  metaTitle: "JSON-TOON コンバーター — LLM プロンプト向けコンパクト JSON",
  metaDescription:
    "ブラウザで即座に JSON を TOON（Token-Oriented Object Notation）に変換。ブラケットフリーで読みやすい TOON 形式で、LLM トークンコストを約40%削減。サーバー不要、サインアップ不要。",
  metaKeywords:
    "JSON to TOON, TOON形式, LLMプロンプト最適化, トークン削減, JSONコンバーター, AI構造化データ, ブラケットフリーJSON, toonformat",

  ogTitle: "JSON-TOON コンバーター",
  ogDescription:
    "JSON を TOON に変換 — LLM プロンプトのトークンを約40%削減。無料、ブラウザのみ、オープンソース。",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  ldName: "JSON-TOON コンバーター",
  ldDescription:
    "免费的浏览器工具，将 JSON 转换为 TOON（Token-Oriented Object Notation），专为 LLM プロンプトに最適化されたコンパクト形式。",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  faqTitle: "よくある質問",
  faq1q: "TOON とは？",
  faq1a:
    "TOON（Token-Oriented Object Notation）は、コンパクトなブラケットフリーの JSON データエンコーディングです。インデントで構造を表現し、標準 JSON よりトークン数を約40%削減します。完全に可逆的で、JSON に无损に戻せます。",
  faq2q: "LLM プロンプトに TOON を使う理由は？",
  faq2a:
    "LLM は文字ではなくトークンを処理します。TOON は同じデータをより少ないトークンで表現するように設計されており、コストとコンテキスト使用量を削減します。公式には混合構造で約40%のトークン削減がうたわれています。",
  faq3q: "TOON は JSON の代わりになる？",
  faq3a:
    "いいえ。TOON は API や設定、汎用データ交換で JSON を取代することを目的としていません。LLM 入力シナリオに特化しています。JSON が標準である場面（API、データベース、設定ファイル）では引き続き JSON を使用してください。",
  faq4q: "オフラインで動作する？",
  faq4a:
    "はい。すべての変換処理はブラウザ内の JavaScript で実行されます。データがサーバーに送信されることはありません。",
  faq5q: "変換は損失があるか？",
  faq5a:
    "ありません。TOON は JSON データモデルの完全無損失エンコーディングです。JSON → TOON → JSON と TOON → JSON → TOON の往返変換はいずれも完全な同一結果を返します。",

  // How to Convert (GEO: step-by-step answer block)
  howToTitle: "JSON を TOON に変換する方法",
  howToStep1Title: "1. JSON を貼り付ける",
  howToStep1Desc: "左側の入力パネルに有効な JSON データを貼り付けるか入力してください。",
  howToStep2Title: "2. 変換をクリック",
  howToStep2Desc: "変換ボタンを押してください。コンバーターがブラウザ内で JSON を TOON に即座に変換します — データは端末の外に送信されません。",
  howToStep3Title: "3. TOON 出力をコピー",
  howToStep3Desc: "TOON 出力をコピーして LLM プロンプトに貼り付けてください。元の JSON と比較してトークンが約40%削減されます。",

  // Syntax Quick Reference
  syntaxTitle: "TOON 構文クイックリファレンス",
  syntaxDesc: "TOON は5つのコアパターンであらゆる JSON 構造を表現します。すべてのパターンはインデントベースで、括弧は使用しません。",

  // Token Savings
  tokenTitle: "トークン削減：JSON vs TOON",
  tokenDesc: "cl100k_base トークナイザー（GPT-4 / Claude）で計測した実際のトークン数。TOON は一貫してトークン使用量を削減し、表形式データで最大の効果を発揮します。",

  // Format Comparison
  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "各フォーマットにはトレードオフがあります。TOON は LLM 入力専用に設計されており、汎用データフォーマットではありません。",

  // Additional FAQ
  faq6q: "TOON はどれくらいトークンを節約できますか？",
  faq6a:
    "実際のデータセットにおいて、cl100k_base（GPT-4 / Claude トークナイザー）で計測した場合、TOON は標準 JSON と比較してトークン数を30〜50%削減します。均一なオブジェクト配列（表形式）で最大の効果があり、繰り返されるキーが完全に排除されます。",
  faq7q: "LLM は TOON を直接出力できますか？",
  faq7a:
    "はい。LLM に TOON 形式で出力するよう指示できます。ただし、本番環境では、切り捨て、フィールドの欠落、構文の不正を検出するために、厳格な TOON デコーダーで出力を必ず検証してください。TOON 仕様にはこの目的のためのストリクトモードが含まれています。",
  faq8q: "TOON は特殊文字や Unicode をどう扱いますか？",
  faq8a:
    "TOON は UTF-8 エンコーディングを使用し、すべての Unicode 文字をサポートします。文字列は、数値・ブール値・null と誤認される可能性がある場合、または配列コンテキストでカンマを含む場合にのみ引用符が必要です。CJK 文字、絵文字、その他の Unicode は引用符なしで使用できます。",

  // Footer
  lastUpdated: "最終更新",
  builtBy: "Next.js で構築、作者",
  specLink: "TOON 仕様",
};
