export const en = {
  // App
  appName: "JSON-TOON Converter",
  appDescription:
    "Convert JSON to TOON (Token-Oriented Object Notation) — a compact, bracket-free format optimized for LLM prompts. No server needed, runs entirely in your browser.",

  // Hero
  heroTitle: "JSON-TOON Converter",
  heroSubtitle:
    "Convert JSON data to TOON — a compact, bracket-free encoding optimized for LLM prompts. 40% fewer tokens, fully reversible, runs in your browser.",

  // Tabs
  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "Validate",

  // Panels
  panelJsonInput: "JSON Input",
  panelToonOutput: "TOON Output",
  panelToonInput: "TOON Input",
  panelJsonOutput: "JSON Output",
  panelJsonData: "JSON Data",
  panelToonExpected: "TOON (expected)",
  panelValidationResult: "Validation Result",

  // Buttons
  btnCopy: "Copy",
  btnLoadSample: "Load Sample",
  btnConvertToToon: "Convert to TOON",
  btnConvertToJson: "Convert to JSON",
  btnValidate: "Validate",

  // Errors
  errorInvalidJson: "Invalid JSON syntax",
  errorInvalidToon: "Invalid TOON syntax",
  errorParse: "Parse error",

  // Validation
  validationRoundTrip: "JSON → TOON → JSON round-trip",
  validationPass: "Pass",
  validationFail: "Fail",
  validationStatus: "Validation",
  validationValid: "Valid TOON",
  validationInvalid: "Invalid",

  // What is TOON section
  sectionWhatIsToon: "What is TOON?",
  sectionWhatIsToonDesc:
    "TOON (Token-Oriented Object Notation) is a compact, bracket-free encoding of JSON data designed for LLM prompts. It uses indentation instead of brackets, reducing token count by ~40% compared to standard JSON. TOON is fully reversible — convert back to JSON losslessly.",
  formatJson: "JSON",
  formatToon: "TOON",

  // When to use
  sectionWhenToUse: "When to Use TOON",
  useCaseGood: "Best for",
  useCaseBad: "Not ideal for",
  useCaseGoodItems: [
    "Feeding structured data to LLMs",
    "Uniform arrays of objects",
    "Reducing token costs",
    "Adding structural validation",
  ],
  useCaseBadItems: [
    "Deeply nested structures",
    "Mixed non-uniform arrays",
    "Latency-critical paths",
  ],

  // Footer
  footerTagline: "JSON-TOON — Open source, runs in your browser.",

  // Navigation
  navGithub: "GitHub",

  // Copied toast
  copied: "Copied!",

  // Meta / SEO
  metaTitle: "JSON-TOON Converter — Compact JSON for LLM Prompts",
  metaDescription:
    "Convert JSON to TOON (Token-Oriented Object Notation) instantly in your browser. Reduce LLM token costs by ~40% with bracket-free, human-readable TOON format. No server, no signup.",
  metaKeywords:
    "JSON to TOON, TOON format, LLM prompt optimization, token reduction, JSON converter, structured data for AI, bracket-free JSON, toonformat",

  // Open Graph
  ogTitle: "JSON-TOON Converter",
  ogDescription: "Convert JSON to TOON — 40% fewer tokens for LLM prompts. Free, browser-only, open source.",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  // JSON-LD
  ldName: "JSON-TOON Converter",
  ldDescription:
    "Free browser-based tool to convert JSON to TOON (Token-Oriented Object Notation), a compact format optimized for LLM prompts.",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  // FAQ
  faqTitle: "Frequently Asked Questions",
  faq1q: "What is TOON?",
  faq1a:
    "TOON (Token-Oriented Object Notation) is a compact, bracket-free encoding of JSON data. It uses indentation instead of brackets and commas, reducing token count by approximately 40% compared to standard JSON. TOON is fully reversible — you can convert back to JSON losslessly.",
  faq2q: "Why use TOON for LLM prompts?",
  faq2a:
    "LLMs process tokens, not characters. TOON is designed to express the same data with fewer tokens, reducing cost and context usage. The official TOON format claims ~40% token reduction on mixed structures, making it ideal for feeding large datasets into prompts.",
  faq3q: "Is TOON a replacement for JSON?",
  faq3a:
    "No. TOON is not meant to replace JSON for APIs, configuration, or general data exchange. It's specifically optimized for LLM input scenarios. For any context where JSON is the standard (APIs, databases, config files), keep using JSON.",
  faq4q: "Does it work offline?",
  faq4a:
    "Yes. All conversion happens entirely in your browser using JavaScript. No data is sent to any server.",
  faq5q: "Is the conversion lossless?",
  faq5a:
    "Yes. TOON is a lossless encoding of the JSON data model. Converting JSON → TOON → JSON produces identical output, and vice versa.",

  // How to Convert (GEO: step-by-step answer block)
  howToTitle: "How to Convert JSON to TOON",
  howToStep1Title: "1. Paste Your JSON",
  howToStep1Desc: "Paste or type valid JSON data into the input panel on the left.",
  howToStep2Title: "2. Click Convert",
  howToStep2Desc: "Press the Convert button. The converter transforms your JSON to TOON instantly in the browser — no data leaves your machine.",
  howToStep3Title: "3. Copy the TOON Output",
  howToStep3Desc: "Copy the TOON output and paste it into your LLM prompt. Expect ~40% fewer tokens compared to the raw JSON.",

  // Syntax Quick Reference (GEO: citable reference block)
  syntaxTitle: "TOON Syntax Quick Reference",
  syntaxDesc: "TOON uses five core patterns to represent any JSON structure. All patterns are indent-based with no brackets.",

  // Token Savings (GEO: data-driven evidence block)
  tokenTitle: "Token Savings: JSON vs TOON",
  tokenDesc: "Real-world token counts measured with the cl100k_base tokenizer (GPT-4 / Claude). TOON consistently reduces token usage, with the biggest gains on tabular data.",

  // Format Comparison (GEO: comparison answer block)
  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "Each format has trade-offs. TOON is designed specifically for LLM input — not as a general-purpose data format.",

  // Additional FAQ (GEO: broader query coverage)
  faq6q: "What tokenizer savings does TOON achieve?",
  faq6a:
    "On real-world datasets, TOON reduces token count by 30–50% compared to standard JSON when measured with cl100k_base (GPT-4 / Claude tokenizer). The savings are highest on uniform object arrays (tabular format), where repeated keys are eliminated entirely.",
  faq7q: "Can LLMs output TOON directly?",
  faq7a:
    "Yes. You can instruct LLMs to generate TOON output. However, for production use, always validate the output with a strict TOON decoder to catch truncation, missing fields, or malformed syntax. The TOON spec includes a strict mode specifically for this purpose.",
  faq8q: "How does TOON handle special characters and Unicode?",
  faq8a:
    "TOON uses UTF-8 encoding and supports all Unicode characters. Strings only need quoting when they could be misinterpreted as numbers, booleans, or null, or when they contain commas in array contexts. CJK characters, emoji, and other Unicode work without quoting.",

  // Footer (GEO: E-E-A-T signals)
  lastUpdated: "Last updated",
  builtBy: "Built with Next.js by",
  specLink: "TOON Spec",
};
