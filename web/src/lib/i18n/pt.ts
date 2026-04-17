export const pt = {
  // App
  appName: "Conversor JSON-TOON",
  appDescription:
    "Converta JSON para TOON (Token-Oriented Object Notation) — um formato compacto sem colchetes, otimizado para prompts LLM. Sem servidor, funciona inteiramente no seu navegador.",

  // Hero
  heroTitle: "Conversor JSON-TOON",
  heroSubtitle:
    "Converta JSON para TOON — uma codificação compacta sem colchetes, otimizada para prompts LLM. Reduz ~40% dos tokens, totalmente reversível, funciona no seu navegador.",

  // Tabs
  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "Validar",

  // Panels
  panelJsonInput: "Entrada JSON",
  panelToonOutput: "Saída TOON",
  panelToonInput: "Entrada TOON",
  panelJsonOutput: "Saída JSON",
  panelJsonData: "Dados JSON",
  panelToonExpected: "TOON (esperado)",
  panelValidationResult: "Resultado da validação",

  // Buttons
  btnCopy: "Copiar",
  btnLoadSample: "Carregar exemplo",
  btnConvertToToon: "Converter para TOON",
  btnConvertToJson: "Converter para JSON",
  btnValidate: "Validar",

  // Errors
  errorInvalidJson: "Sintaxe JSON inválida",
  errorInvalidToon: "Sintaxe TOON inválida",
  errorParse: "Erro de análise",

  // Validation
  validationRoundTrip: "JSON → TOON → JSON ida e volta",
  validationPass: "Aprovado",
  validationFail: "Reprovado",
  validationStatus: "Status da validação",
  validationValid: "TOON válido",
  validationInvalid: "Inválido",

  // What is TOON section
  sectionWhatIsToon: "O que é TOON?",
  sectionWhatIsToonDesc:
    "TOON (Token-Oriented Object Notation) é uma codificação compacta e sem colchetes de dados JSON, projetada para prompts LLM. Usa indentação em vez de colchetes, reduzindo o número de tokens em ~40%. TOON é totalmente reversível — converta de volta para JSON sem perda.",
  formatJson: "JSON",
  formatToon: "TOON",

  // When to use
  sectionWhenToUse: "Quando usar TOON",
  useCaseGood: "Melhor para",
  useCaseBad: "Menos ideal para",
  useCaseGoodItems: [
    "Fornecer dados estruturados para LLMs",
    "Arrays uniformes de objetos",
    "Reduzir custos de tokens",
    "Adicionar validação estrutural",
  ],
  useCaseBadItems: [
    "Estruturas profundamente aninhadas",
    "Arrays mistos não uniformes",
    "Caminhos críticos de latência",
  ],

  // Footer
  footerTagline: "JSON-TOON — Código aberto, funciona no seu navegador.",

  // Navigation
  navGithub: "GitHub",

  // Copied toast
  copied: "Copiado!",

  // Meta / SEO
  metaTitle: "Conversor JSON-TOON — JSON compacto para prompts LLM",
  metaDescription:
    "Converta JSON para TOON (Token-Oriented Object Notation) instantaneamente no seu navegador. Reduza os custos de tokens LLM em ~40% com o formato TOON sem colchetes e legível. Sem servidor, sem cadastro.",
  metaKeywords:
    "JSON para TOON, formato TOON, otimização de prompts LLM, redução de tokens, conversor JSON, dados estruturados para IA, JSON sem colchetes, toonformat",

  // Open Graph
  ogTitle: "Conversor JSON-TOON",
  ogDescription: "Converta JSON para TOON — 40% menos tokens para prompts LLM. Grátis, só navegador, código aberto.",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  // JSON-LD
  ldName: "Conversor JSON-TOON",
  ldDescription:
    "Ferramenta gratuita baseada em navegador para converter JSON para TOON (Token-Oriented Object Notation), um formato compacto otimizado para prompts LLM.",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  // FAQ
  faqTitle: "Perguntas frequentes",
  faq1q: "O que é TOON?",
  faq1a:
    "TOON (Token-Oriented Object Notation) é uma codificação compacta e sem colchetes de dados JSON. Usa indentação em vez de colchetes e vírgulas, reduzindo o número de tokens em ~40% em comparação com o JSON padrão. TOON é totalmente reversível — você pode converter de volta para JSON sem perda.",
  faq2q: "Por que usar TOON para prompts LLM?",
  faq2a:
    "LLMs processam tokens, não caracteres. TOON é projetado para expressar os mesmos dados com menos tokens, reduzindo custos e uso de contexto. O formato oficial TOON alega uma redução de ~40% em tokens em estruturas mistas.",
  faq3q: "TOON pode substituir JSON?",
  faq3a:
    "Não. TOON não se destina a substituir JSON para APIs, configuração ou troca geral de dados. É especificamente otimizado para cenários de entrada LLM. Para qualquer contexto onde JSON é o padrão (APIs, bancos de dados, arquivos de config), continue usando JSON.",
  faq4q: "Funciona offline?",
  faq4a:
    "Sim. Toda a conversão ocorre inteiramente no seu navegador com JavaScript. Nenhum dado é enviado a nenhum servidor.",
  faq5q: "A conversão é sem perda?",
  faq5a:
    "Sim. TOON é uma codificação sem perda do modelo de dados JSON. Converter JSON → TOON → JSON produz resultado idêntico, e vice-versa.",

  // How to Convert (GEO: step-by-step answer block)
  howToTitle: "Como converter JSON para TOON",
  howToStep1Title: "1. Cole seu JSON",
  howToStep1Desc: "Cole ou digite dados JSON válidos no painel de entrada à esquerda.",
  howToStep2Title: "2. Clique em Converter",
  howToStep2Desc: "Pressione o botão Converter. O conversor transforma seu JSON em TOON instantaneamente no navegador — nenhum dado sai da sua máquina.",
  howToStep3Title: "3. Copie a saída TOON",
  howToStep3Desc: "Copie a saída TOON e cole no seu prompt LLM. Espere ~40% menos tokens em comparação com o JSON bruto.",

  // Syntax Quick Reference
  syntaxTitle: "Referência rápida da sintaxe TOON",
  syntaxDesc: "TOON usa cinco padrões fundamentais para representar qualquer estrutura JSON. Todos os padrões são baseados em indentação, sem colchetes.",

  // Token Savings
  tokenTitle: "Economia de tokens: JSON vs TOON",
  tokenDesc: "Contagens reais de tokens medidas com o tokenizador cl100k_base (GPT-4 / Claude). TOON reduz consistentemente o uso de tokens, com os maiores ganhos em dados tabulares.",

  // Format Comparison
  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "Cada formato tem seus compromissos. TOON é projetado especificamente para entrada de LLM — não como um formato de dados de uso geral.",

  // Additional FAQ
  faq6q: "Quanto de tokens o TOON economiza?",
  faq6a:
    "Em conjuntos de dados reais, TOON reduz a contagem de tokens em 30–50% em comparação com JSON padrão, medido com cl100k_base (tokenizador GPT-4 / Claude). A economia é maior em arrays uniformes de objetos (formato tabular), onde as chaves repetidas são completamente eliminadas.",
  faq7q: "LLMs podem gerar TOON diretamente?",
  faq7a:
    "Sim. Você pode instruir LLMs a gerar saída em TOON. No entanto, para uso em produção, sempre valide a saída com um decodificador TOON estrito para detectar truncamentos, campos ausentes ou sintaxe malformada. A especificação TOON inclui um modo estrito especificamente para esse propósito.",
  faq8q: "Como o TOON lida com caracteres especiais e Unicode?",
  faq8a:
    "TOON usa codificação UTF-8 e suporta todos os caracteres Unicode. Strings só precisam de aspas quando podem ser mal interpretadas como números, booleanos ou null, ou quando contêm vírgulas em contextos de array. Caracteres CJK, emoji e outros caracteres Unicode funcionam sem aspas.",

  // Footer
  lastUpdated: "Última atualização",
  builtBy: "Construído com Next.js por",
  specLink: "Especificação TOON",
};
