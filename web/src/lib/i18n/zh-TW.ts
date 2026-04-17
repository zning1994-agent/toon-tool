export const zhTW = {
  appName: "JSON-TOON 轉換器",
  appDescription:
    "將 JSON 轉換為 TOON（Token-Oriented Object Notation）—— 一種緊湊、無括號的格式，專為 LLM 提示詞優化。無需伺服器，完全在瀏覽器中運行。",

  heroTitle: "JSON-TOON 轉換器",
  heroSubtitle:
    "將 JSON 轉換為 TOON — 緊湊、無括號的編碼格式，專為 LLM 提示詞優化。減少約 40% token，完全可逆，在瀏覽器中即時運行。",

  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "驗證",

  panelJsonInput: "JSON 輸入",
  panelToonOutput: "TOON 輸出",
  panelToonInput: "TOON 輸入",
  panelJsonOutput: "JSON 輸出",
  panelJsonData: "JSON 資料",
  panelToonExpected: "TOON（預期格式）",
  panelValidationResult: "驗證結果",

  btnCopy: "複製",
  btnLoadSample: "載入範例",
  btnConvertToToon: "轉換為 TOON",
  btnConvertToJson: "轉換為 JSON",
  btnValidate: "驗證",

  errorInvalidJson: "JSON 語法無效",
  errorInvalidToon: "TOON 語法無效",
  errorParse: "解析錯誤",

  validationRoundTrip: "JSON → TOON → JSON 往返轉換",
  validationPass: "通過",
  validationFail: "失敗",
  validationStatus: "驗證狀態",
  validationValid: "TOON 格式有效",
  validationInvalid: "無效",

  sectionWhatIsToon: "什麼是 TOON？",
  sectionWhatIsToonDesc:
    "TOON（Token-Oriented Object Notation）是一種緊湊、無括號的 JSON 資料編碼，專為 LLM 提示詞設計。它使用縮排代替括號，減少約 40% 的 token 數量。TOON 完全可逆，可無損轉換回 JSON。",
  formatJson: "JSON",
  formatToon: "TOON",

  sectionWhenToUse: "何時使用 TOON",
  useCaseGood: "適合場景",
  useCaseBad: "不適合場景",
  useCaseGoodItems: [
    "向 LLM 輸入結構化資料",
    "統一格式的物件陣列",
    "降低 token 成本",
    "增加結構驗證能力",
  ],
  useCaseBadItems: [
    "深度巢狀結構",
    "混合非統一陣列",
    "對延遲敏感的場景",
  ],

  footerTagline: "JSON-TOON — 開源專案，運行於瀏覽器。",

  navGithub: "GitHub",

  copied: "已複製！",

  metaTitle: "JSON-TOON 轉換器 — LLM 提示詞專用的緊湊 JSON 格式",
  metaDescription:
    "在瀏覽器中即時將 JSON 轉換為 TOON（Token-Oriented Object Notation）。使用無括號、易讀的 TOON 格式，減少約 40% LLM token 成本。無需伺服器，無需註冊。",
  metaKeywords:
    "JSON轉TOON, TOON格式, LLM提示詞優化, token節省, JSON轉換器, AI結構化資料, 無括號JSON, toonformat",

  ogTitle: "JSON-TOON 轉換器",
  ogDescription:
    "將 JSON 轉換為 TOON — LLM 提示詞減少約 40% token。免費、僅需瀏覽器、開源。",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  ldName: "JSON-TOON 轉換器",
  ldDescription:
    "免費的基於瀏覽器的工具，將 JSON 轉換為 TOON（Token-Oriented Object Notation），這是一種專為 LLM 提示詞優化的緊湊格式。",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  faqTitle: "常見問題",
  faq1q: "什麼是 TOON？",
  faq1a:
    "TOON（Token-Oriented Object Notation）是一種緊湊、無括號的 JSON 資料編碼。它使用縮排代替括號和逗號，相比標準 JSON 減少約 40% 的 token。TOON 完全可逆，可無損轉換回 JSON。",
  faq2q: "為什麼 LLM 提示詞要用 TOON？",
  faq2a:
    "LLM 處理的是 token 而非字元。TOON 的設計初衷就是用更少的 token 表達相同資料，降低成本和上下文佔用。官方聲稱在混合結構上可減少約 40% 的 token，非常適合向提示詞輸入大型資料集。",
  faq3q: "TOON 能替代 JSON 嗎？",
  faq3a:
    "不能。TOON 的定位不是替代 JSON 用於 API、配置或通用資料交換。它專門針對 LLM 輸入場景進行了優化。在任何 JSON 作為標準格式的場合（API、資料庫、組態檔案），請繼續使用 JSON。",
  faq4q: "支援離線使用嗎？",
  faq4a:
    "支援。所有轉換邏輯完全在瀏覽器中用 JavaScript 執行，資料不會傳送到任何伺服器。",
  faq5q: "轉換會丟失資料嗎？",
  faq5a:
    "不會。TOON 是 JSON 資料模型的完全無損編碼。JSON → TOON → JSON 和 TOON → JSON → TOON 的往返轉換都能得到完全一致的結果。",

  // How to Convert (GEO: step-by-step answer block)
  howToTitle: "如何將 JSON 轉換為 TOON",
  howToStep1Title: "1. 貼上你的 JSON",
  howToStep1Desc: "將有效的 JSON 資料貼上或輸入到左側的輸入面板。",
  howToStep2Title: "2. 點擊轉換",
  howToStep2Desc: "按下轉換按鈕。轉換器會在瀏覽器中即時將 JSON 轉換為 TOON — 資料不會離開你的電腦。",
  howToStep3Title: "3. 複製 TOON 輸出",
  howToStep3Desc: "複製 TOON 輸出並貼入你的 LLM 提示詞。與原始 JSON 相比，預期可減少約 40% 的 token。",

  // Syntax Quick Reference
  syntaxTitle: "TOON 語法快速參考",
  syntaxDesc: "TOON 使用五種核心模式來表示任何 JSON 結構。所有模式都基於縮排，不使用括號。",

  // Token Savings
  tokenTitle: "Token 節省：JSON vs TOON",
  tokenDesc: "使用 cl100k_base 分詞器（GPT-4 / Claude）測量的真實 token 數量。TOON 始終能減少 token 使用量，在表格資料上效果最顯著。",

  // Format Comparison
  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "每種格式都有取捨。TOON 專為 LLM 輸入設計 — 並非通用資料格式。",

  // Additional FAQ
  faq6q: "TOON 能節省多少 token？",
  faq6a:
    "在真實資料集上，使用 cl100k_base（GPT-4 / Claude 分詞器）測量，TOON 相比標準 JSON 減少 30–50% 的 token。在統一物件陣列（表格格式）上節省最多，因為重複的鍵名被完全消除。",
  faq7q: "LLM 可以直接輸出 TOON 嗎？",
  faq7a:
    "可以。你可以指示 LLM 生成 TOON 格式的輸出。不過在生產環境中，請務必使用嚴格的 TOON 解碼器來驗證輸出，以捕獲截斷、缺失欄位或語法錯誤。TOON 規範專門為此提供了嚴格模式。",
  faq8q: "TOON 如何處理特殊字元和 Unicode？",
  faq8a:
    "TOON 使用 UTF-8 編碼，支援所有 Unicode 字元。字串只有在可能被誤判為數字、布林值或 null 時，或在陣列上下文中包含逗號時，才需要加引號。CJK 字元、emoji 和其他 Unicode 字元無需加引號即可正常使用。",

  // Footer
  lastUpdated: "最後更新",
  builtBy: "使用 Next.js 構建，作者",
  specLink: "TOON 規範",
};
