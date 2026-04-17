export const ko = {
  // App
  appName: "JSON-TOON 변환기",
  appDescription:
    "JSON을 TOON(Token-Oriented Object Notation)으로 변환 — LLM 프롬프트에 최적화된紧凑한 괄호 없는 형식. 서버 불필요, 브라우저에서만 동작.",

  // Hero
  heroTitle: "JSON-TOON 변환기",
  heroSubtitle:
    "JSON을 TOON으로 변환 — LLM 프롬프트에 최적화된紧凑한 괄호 없는 인코딩. 토큰 ~40% 절감, 완전 가역적, 브라우저에서 즉시 동작.",

  // Tabs
  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "검증",

  // Panels
  panelJsonInput: "JSON 입력",
  panelToonOutput: "TOON 출력",
  panelToonInput: "TOON 입력",
  panelJsonOutput: "JSON 출력",
  panelJsonData: "JSON 데이터",
  panelToonExpected: "TOON (기대값)",
  panelValidationResult: "검증 결과",

  // Buttons
  btnCopy: "복사",
  btnLoadSample: "샘플 불러오기",
  btnConvertToToon: "TOON으로 변환",
  btnConvertToJson: "JSON으로 변환",
  btnValidate: "검증",

  // Errors
  errorInvalidJson: "잘못된 JSON 구문",
  errorInvalidToon: "잘못된 TOON 구문",
  errorParse: "파싱 오류",

  // Validation
  validationRoundTrip: "JSON → TOON → JSON 라운드트립",
  validationPass: "통과",
  validationFail: "실패",
  validationStatus: "검증 상태",
  validationValid: "유효한 TOON",
  validationInvalid: "유효하지 않음",

  // What is TOON section
  sectionWhatIsToon: "TOON이란?",
  sectionWhatIsToonDesc:
    "TOON(Token-Oriented Object Notation)은 LLM 프롬프트를 위해 설계된紧凑한 괄호 없는 JSON 데이터 인코딩입니다. 괄호 대신 들여쓰기를 사용하며 표준 JSON 대비 토큰 수를 ~40% 절감합니다. TOON은 완전 가역적입니다 — 손실 없이 JSON으로 다시 변환할 수 있습니다.",
  formatJson: "JSON",
  formatToon: "TOON",

  // When to use
  sectionWhenToUse: "TOON 사용 시기",
  useCaseGood: "최적의 경우",
  useCaseBad: "적합하지 않은 경우",
  useCaseGoodItems: [
    "LLM에 구조화된 데이터 제공",
    "균일한 객체 배열",
    "토큰 비용 절감",
    "구조적 검증 추가",
  ],
  useCaseBadItems: [
    "깊은 중첩 구조",
    "혼합 비균일 배열",
    "지연 시간 중요한 경로",
  ],

  // Footer
  footerTagline: "JSON-TOON — 오픈소스, 브라우저에서 동작.",

  // Navigation
  navGithub: "GitHub",

  // Copied toast
  copied: "복사됨!",

  // Meta / SEO
  metaTitle: "JSON-TOON 변환기 — LLM 프롬프트용紧凑한 JSON",
  metaDescription:
    "브라우저에서 JSON을 TOON(Token-Oriented Object Notation)으로 즉시 변환. 괄호 없이 읽기 쉬운 TOON 형식으로 LLM 토큰 비용을 ~40% 절감. 서버 불필요, 가입 불필요.",
  metaKeywords:
    "JSON을 TOON으로, TOON 형식, LLM 프롬프트 최적화, 토큰 절감, JSON 변환기, AI 구조화된 데이터, 괄호 없는 JSON, toonformat",

  // Open Graph
  ogTitle: "JSON-TOON 변환기",
  ogDescription: "JSON을 TOON으로 변환 — LLM 프롬프트 토큰 40% 절감. 무료, 브라우저 전용, 오픈소스.",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  // JSON-LD
  ldName: "JSON-TOON 변환기",
  ldDescription:
    "JSON을 TOON(Token-Oriented Object Notation)으로 변환하는 무료 브라우저 기반 도구로, LLM 프롬프트에 최적화된紧凑한 형식입니다.",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  // FAQ
  faqTitle: "자주 묻는 질문",
  faq1q: "TOON이란?",
  faq1a:
    "TOON(Token-Oriented Object Notation)은 JSON 데이터의紧凑한 괄호 없는 인코딩입니다. 괄호와 쉼표 대신 들여쓰기를 사용하며 표준 JSON 대비 토큰 수를 ~40% 절감합니다. TOON은 완전 가역적입니다 — 손실 없이 JSON으로 다시 변환할 수 있습니다.",
  faq2q: "LLM 프롬프트에 TOON을 사용하는 이유는?",
  faq2a:
    "LLM은 문자가 아닌 토큰을 처리합니다. TOON은 동일한 데이터를 더 적은 토큰으로 표현하도록 설계되어 비용과 컨텍스트 사용량을 줄입니다. 공식 TOON 형식은 혼합 구조에서 ~40% 토큰 절감을 주장합니다.",
  faq3q: "TOON이 JSON을 대체할 수 있나요?",
  faq3a:
    "아니요. TOON은 API, 구성 또는 일반 데이터 교환을 위해 JSON을 대체할 목적이 아닙니다. 특히 LLM 입력 시나리오에 최적화되어 있습니다. JSON이 표준인 모든 컨텍스트(API, 데이터베이스, 구성 파일)에서는 계속 JSON을 사용하세요.",
  faq4q: "오프라인으로 작동하나요?",
  faq4a:
    "네. 모든 변환은 브라우저 내 JavaScript로 완전히 실행됩니다. 데이터가 서버로 전송되지 않습니다.",
  faq5q: "변환이 무손실인가요?",
  faq5a:
    "네. TOON은 JSON 데이터 모델의 무손실 인코딩입니다. JSON → TOON → JSON 변환은 동일한 결과를 생성하며 그 반대의 경우도 마찬가지입니다.",

  // How to Convert (GEO: step-by-step answer block)
  howToTitle: "JSON을 TOON으로 변환하는 방법",
  howToStep1Title: "1. JSON 붙여넣기",
  howToStep1Desc: "왼쪽 입력 패널에 유효한 JSON 데이터를 붙여넣거나 입력하세요.",
  howToStep2Title: "2. 변환 클릭",
  howToStep2Desc: "변환 버튼을 누르세요. 변환기가 브라우저에서 JSON을 TOON으로 즉시 변환합니다 — 데이터가 기기 밖으로 전송되지 않습니다.",
  howToStep3Title: "3. TOON 출력 복사",
  howToStep3Desc: "TOON 출력을 복사하여 LLM 프롬프트에 붙여넣으세요. 원본 JSON 대비 토큰이 약 40% 절감됩니다.",

  // Syntax Quick Reference
  syntaxTitle: "TOON 구문 빠른 참조",
  syntaxDesc: "TOON은 다섯 가지 핵심 패턴으로 모든 JSON 구조를 표현합니다. 모든 패턴은 들여쓰기 기반이며 괄호를 사용하지 않습니다.",

  // Token Savings
  tokenTitle: "토큰 절감: JSON vs TOON",
  tokenDesc: "cl100k_base 토크나이저(GPT-4 / Claude)로 측정한 실제 토큰 수입니다. TOON은 일관되게 토큰 사용량을 줄이며, 표 형식 데이터에서 가장 큰 효과를 보입니다.",

  // Format Comparison
  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "각 형식에는 장단점이 있습니다. TOON은 LLM 입력 전용으로 설계되었으며, 범용 데이터 형식이 아닙니다.",

  // Additional FAQ
  faq6q: "TOON은 토큰을 얼마나 절약하나요?",
  faq6a:
    "실제 데이터셋에서 cl100k_base(GPT-4 / Claude 토크나이저)로 측정했을 때, TOON은 표준 JSON 대비 토큰 수를 30~50% 줄입니다. 균일한 객체 배열(표 형식)에서 절감 효과가 가장 크며, 반복되는 키가 완전히 제거됩니다.",
  faq7q: "LLM이 TOON을 직접 출력할 수 있나요?",
  faq7a:
    "네. LLM에 TOON 형식으로 출력하도록 지시할 수 있습니다. 다만 프로덕션 환경에서는 잘림, 누락된 필드, 잘못된 구문을 감지하기 위해 반드시 엄격한 TOON 디코더로 출력을 검증하세요. TOON 사양에는 이를 위한 엄격 모드가 포함되어 있습니다.",
  faq8q: "TOON은 특수 문자와 Unicode를 어떻게 처리하나요?",
  faq8a:
    "TOON은 UTF-8 인코딩을 사용하며 모든 Unicode 문자를 지원합니다. 문자열은 숫자, 불리언, null로 오인될 수 있거나 배열 컨텍스트에서 쉼표를 포함하는 경우에만 따옴표가 필요합니다. CJK 문자, 이모지 및 기타 Unicode 문자는 따옴표 없이 사용할 수 있습니다.",

  // Footer
  lastUpdated: "마지막 업데이트",
  builtBy: "Next.js로 제작, 개발자",
  specLink: "TOON 사양",
};
