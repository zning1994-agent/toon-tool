export const zhCN = {
  appName: "JSON-TOON 转换器",
  appDescription:
    "将 JSON 转换为 TOON（Token-Oriented Object Notation）—— 一种紧凑、无括号的格式，专为 LLM 提示词优化。无需服务器，完全在浏览器中运行。",

  heroTitle: "JSON-TOON 转换器",
  heroSubtitle:
    "将 JSON 转换为 TOON — 紧凑、无括号的编码格式，专为 LLM 提示词优化。减少约 40% token，完全可逆，在浏览器中即时运行。",

  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "校验",

  panelJsonInput: "JSON 输入",
  panelToonOutput: "TOON 输出",
  panelToonInput: "TOON 输入",
  panelJsonOutput: "JSON 输出",
  panelJsonData: "JSON 数据",
  panelToonExpected: "TOON（预期格式）",
  panelValidationResult: "校验结果",

  btnCopy: "复制",
  btnLoadSample: "加载示例",
  btnConvertToToon: "转换为 TOON",
  btnConvertToJson: "转换为 JSON",
  btnValidate: "校验",

  errorInvalidJson: "JSON 语法无效",
  errorInvalidToon: "TOON 语法无效",
  errorParse: "解析错误",

  validationRoundTrip: "JSON → TOON → JSON 往返转换",
  validationPass: "通过",
  validationFail: "失败",
  validationStatus: "校验状态",
  validationValid: "TOON 格式有效",
  validationInvalid: "无效",

  sectionWhatIsToon: "什么是 TOON？",
  sectionWhatIsToonDesc:
    "TOON（Token-Oriented Object Notation）是一种紧凑、无括号的 JSON 数据编码，专为 LLM 提示词设计。它使用缩进代替括号，减少约 40% 的 token 数量。TOON 完全可逆，可无损转换回 JSON。",
  formatJson: "JSON",
  formatToon: "TOON",

  sectionWhenToUse: "何时使用 TOON",
  useCaseGood: "适合场景",
  useCaseBad: "不适合场景",
  useCaseGoodItems: [
    "向 LLM 输入结构化数据",
    "统一格式的对象数组",
    "降低 token 成本",
    "增加结构校验能力",
  ],
  useCaseBadItems: [
    "深度嵌套结构",
    "混合非统一数组",
    "对延迟敏感的场景",
  ],

  footerTagline: "JSON-TOON — 开源项目，运行于浏览器。",

  navGithub: "GitHub",

  copied: "已复制！",

  metaTitle: "JSON-TOON 转换器 — LLM 提示词专用的紧凑 JSON 格式",
  metaDescription:
    "在浏览器中即时将 JSON 转换为 TOON（Token-Oriented Object Notation）。使用无括号、易读的 TOON 格式，减少约 40% LLM token 成本。无需服务器，无需注册。",
  metaKeywords:
    "JSON转TOON, TOON格式, LLM提示词优化, token节省, JSON转换器, AI结构化数据, 无括号JSON, toonformat",

  ogTitle: "JSON-TOON 转换器",
  ogDescription:
    "将 JSON 转换为 TOON — LLM 提示词减少约 40% token。免费、仅需浏览器、开源。",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  ldName: "JSON-TOON 转换器",
  ldDescription:
    "免费的基于浏览器的工具，将 JSON 转换为 TOON（Token-Oriented Object Notation），这是一种专为 LLM 提示词优化的紧凑格式。",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  faqTitle: "常见问题",
  faq1q: "什么是 TOON？",
  faq1a:
    "TOON（Token-Oriented Object Notation）是一种紧凑、无括号的 JSON 数据编码。它使用缩进代替括号和逗号，相比标准 JSON 减少约 40% 的 token。TOON 完全可逆，可无损转换回 JSON。",
  faq2q: "为什么 LLM 提示词要用 TOON？",
  faq2a:
    "LLM 处理的是 token 而非字符。TOON 设计初衷就是用更少的 token 表达相同数据，降低成本和上下文占用。官方声称在混合结构上可减少约 40% 的 token，非常适合向提示词输入大型数据集。",
  faq3q: "TOON 能替代 JSON 吗？",
  faq3a:
    "不能。TOON 的定位不是替代 JSON 用于 API、配置或通用数据交换。它专门针对 LLM 输入场景进行了优化。在任何 JSON 作为标准格式的场合（API、数据库、配置文件），请继续使用 JSON。",
  faq4q: "支持离线使用吗？",
  faq4a:
    "支持。所有转换逻辑完全在浏览器中用 JavaScript 执行，数据不会发送到任何服务器。",
  faq5q: "转换会丢失数据吗？",
  faq5a:
    "不会。TOON 是 JSON 数据模型的完全无损编码。JSON → TOON → JSON 和 TOON → JSON → TOON 的往返转换都能得到完全一致的结果。",

  howToTitle: "如何将 JSON 转换为 TOON",
  howToStep1Title: "1. 粘贴 JSON 数据",
  howToStep1Desc: "将有效的 JSON 数据粘贴或输入到左侧的输入面板中。",
  howToStep2Title: "2. 点击转换",
  howToStep2Desc: "点击转换按钮。转换器在浏览器中即时将 JSON 转换为 TOON —— 数据不会离开你的设备。",
  howToStep3Title: "3. 复制 TOON 输出",
  howToStep3Desc: "复制 TOON 输出并粘贴到你的 LLM 提示词中。相比原始 JSON，预计可减少约 40% 的 token。",

  syntaxTitle: "TOON 语法速查",
  syntaxDesc: "TOON 使用五种核心模式来表示任何 JSON 结构。所有模式基于缩进，不使用括号。",

  tokenTitle: "Token 节省对比：JSON vs TOON",
  tokenDesc: "使用 cl100k_base 分词器（GPT-4 / Claude 使用）的实测 token 数据。TOON 在表格型数据上节省最多。",

  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "每种格式各有优劣。TOON 专为 LLM 输入设计，不是通用数据格式。",

  faq6q: "TOON 能节省多少 token？",
  faq6a:
    "在实际数据集上，使用 cl100k_base 分词器（GPT-4 / Claude）测量，TOON 相比标准 JSON 减少 30–50% 的 token。在统一对象数组（表格格式）上节省最大，因为重复的键名被完全消除。",
  faq7q: "LLM 能直接输出 TOON 吗？",
  faq7a:
    "可以。你可以指示 LLM 生成 TOON 格式的输出。但在生产环境中，务必使用严格模式的 TOON 解码器来验证输出，以捕获截断、缺失字段或格式错误。TOON 规范专门为此提供了严格模式。",
  faq8q: "TOON 如何处理特殊字符和 Unicode？",
  faq8a:
    "TOON 使用 UTF-8 编码，支持所有 Unicode 字符。字符串仅在可能被误解为数字、布尔值或 null，或在数组上下文中包含逗号时才需要加引号。中日韩字符、表情符号和其他 Unicode 字符无需加引号即可使用。",

  lastUpdated: "最后更新",
  builtBy: "使用 Next.js 构建，作者",
  specLink: "TOON 规范",
};
