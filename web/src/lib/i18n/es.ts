export const es = {
  // App
  appName: "Convertidor JSON-TOON",
  appDescription:
    "Convierte JSON a TOON (Token-Oriented Object Notation) — un formato compacto sin corchetes, optimizado para prompts LLM. Sin servidor, funciona enteramente en tu navegador.",

  // Hero
  heroTitle: "Convertidor JSON-TOON",
  heroSubtitle:
    "Convierte JSON a TOON — una codificación compacta sin corchetes, optimizada para prompts LLM. Reduce ~40% los tokens, completamente reversible, funciona en tu navegador.",

  // Tabs
  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "Validar",

  // Panels
  panelJsonInput: "Entrada JSON",
  panelToonOutput: "Salida TOON",
  panelToonInput: "Entrada TOON",
  panelJsonOutput: "Salida JSON",
  panelJsonData: "Datos JSON",
  panelToonExpected: "TOON (esperado)",
  panelValidationResult: "Resultado de validación",

  // Buttons
  btnCopy: "Copiar",
  btnLoadSample: "Cargar ejemplo",
  btnConvertToToon: "Convertir a TOON",
  btnConvertToJson: "Convertir a JSON",
  btnValidate: "Validar",

  // Errors
  errorInvalidJson: "Sintaxis JSON inválida",
  errorInvalidToon: "Sintaxis TOON inválida",
  errorParse: "Error de análisis",

  // Validation
  validationRoundTrip: "JSON → TOON → JSON ida y vuelta",
  validationPass: "Aprobado",
  validationFail: "Fallido",
  validationStatus: "Estado de validación",
  validationValid: "TOON válido",
  validationInvalid: "Inválido",

  // What is TOON section
  sectionWhatIsToon: "¿Qué es TOON?",
  sectionWhatIsToonDesc:
    "TOON (Token-Oriented Object Notation) es una codificación compacta y sin corchetes de datos JSON, diseñada para prompts LLM. Utiliza indentación en lugar de corchetes, reduciendo el número de tokens en ~40%. TOON es completamente reversible — convierte de vuelta a JSON sin pérdida.",
  formatJson: "JSON",
  formatToon: "TOON",

  // When to use
  sectionWhenToUse: "Cuándo usar TOON",
  useCaseGood: "Mejor para",
  useCaseBad: "No ideal para",
  useCaseGoodItems: [
    "Alimentar datos estructurados a LLMs",
    "Arreglos uniformes de objetos",
    "Reducir costos de tokens",
    "Añadir validación estructural",
  ],
  useCaseBadItems: [
    "Estructuras profundamente anidadas",
    "Arreglos mixtos no uniformes",
    "Rutas críticas de latencia",
  ],

  // Footer
  footerTagline: "JSON-TOON — Código abierto, funciona en tu navegador.",

  // Navigation
  navGithub: "GitHub",

  // Copied toast
  copied: "¡Copiado!",

  // Meta / SEO
  metaTitle: "Convertidor JSON-TOON — JSON compacto para prompts LLM",
  metaDescription:
    "Convierte JSON a TOON (Token-Oriented Object Notation) al instante en tu navegador. Reduce los costos de tokens LLM en ~40% con el formato TOON sin corchetes y legible. Sin servidor, sin registro.",
  metaKeywords:
    "JSON a TOON, formato TOON, optimización de prompts LLM, reducción de tokens, convertidor JSON, datos estructurados para IA, JSON sin corchetes, toonformat",

  // Open Graph
  ogTitle: "Convertidor JSON-TOON",
  ogDescription: "Convierte JSON a TOON — 40% menos tokens para prompts LLM. Gratis, solo navegador, código abierto.",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  // JSON-LD
  ldName: "Convertidor JSON-TOON",
  ldDescription:
    "Herramienta gratuita basada en el navegador para convertir JSON a TOON (Token-Oriented Object Notation), un formato compacto optimizado para prompts LLM.",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  // FAQ
  faqTitle: "Preguntas frecuentes",
  faq1q: "¿Qué es TOON?",
  faq1a:
    "TOON (Token-Oriented Object Notation) es una codificación compacta y sin corchetes de datos JSON. Utiliza indentación en lugar de corchetes y comas, reduciendo el número de tokens en ~40% respecto al JSON estándar. TOON es completamente reversible — puedes volver a JSON sin pérdida.",
  faq2q: "¿Por qué usar TOON para prompts LLM?",
  faq2a:
    "Los LLMs procesan tokens, no caracteres. TOON está diseñado para expresar los mismos datos con menos tokens, reduciendo costos y uso de contexto. El formato oficial TOON afirma una reducción de ~40% en tokens en estructuras mixtas.",
  faq3q: "¿TOON puede reemplazar a JSON?",
  faq3a:
    "No. TOON no está pensado para reemplazar JSON en APIs, configuración o intercambio de datos general. Está específicamente optimizado para escenarios de entrada LLM. Para cualquier contexto donde JSON es el estándar (APIs, bases de datos, archivos de config), sigue usando JSON.",
  faq4q: "¿Funciona sin conexión?",
  faq4a:
    "Sí. Toda la conversión ocurre enteramente en tu navegador con JavaScript. Ningún dato se envía a ningún servidor.",
  faq5q: "¿La conversión es sin pérdida?",
  faq5a:
    "Sí. TOON es una codificación sin pérdida del modelo de datos JSON. Convertir JSON → TOON → JSON produce un resultado idéntico, y viceversa.",

  // How to Convert (GEO: step-by-step answer block)
  howToTitle: "Cómo convertir JSON a TOON",
  howToStep1Title: "1. Pega tu JSON",
  howToStep1Desc: "Pega o escribe datos JSON válidos en el panel de entrada de la izquierda.",
  howToStep2Title: "2. Haz clic en Convertir",
  howToStep2Desc: "Pulsa el botón Convertir. El convertidor transforma tu JSON a TOON instantáneamente en el navegador — ningún dato sale de tu máquina.",
  howToStep3Title: "3. Copia la salida TOON",
  howToStep3Desc: "Copia la salida TOON y pégala en tu prompt LLM. Espera ~40% menos tokens en comparación con el JSON sin procesar.",

  // Syntax Quick Reference
  syntaxTitle: "Referencia rápida de la sintaxis TOON",
  syntaxDesc: "TOON usa cinco patrones fundamentales para representar cualquier estructura JSON. Todos los patrones se basan en indentación, sin corchetes.",

  // Token Savings
  tokenTitle: "Ahorro de tokens: JSON vs TOON",
  tokenDesc: "Conteos reales de tokens medidos con el tokenizador cl100k_base (GPT-4 / Claude). TOON reduce consistentemente el uso de tokens, con las mayores ganancias en datos tabulares.",

  // Format Comparison
  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "Cada formato tiene sus compromisos. TOON está diseñado específicamente para la entrada de LLM — no como un formato de datos de uso general.",

  // Additional FAQ
  faq6q: "¿Cuántos tokens ahorra TOON?",
  faq6a:
    "En conjuntos de datos reales, TOON reduce el conteo de tokens entre un 30 y un 50% en comparación con JSON estándar, medido con cl100k_base (tokenizador de GPT-4 / Claude). El ahorro es mayor en arrays uniformes de objetos (formato tabular), donde las claves repetidas se eliminan por completo.",
  faq7q: "¿Pueden los LLMs generar TOON directamente?",
  faq7a:
    "Sí. Puedes instruir a los LLMs para que generen salida en TOON. Sin embargo, en producción, valida siempre la salida con un decodificador TOON estricto para detectar truncamientos, campos faltantes o sintaxis malformada. La especificación TOON incluye un modo estricto específicamente para este propósito.",
  faq8q: "¿Cómo maneja TOON los caracteres especiales y Unicode?",
  faq8a:
    "TOON usa codificación UTF-8 y soporta todos los caracteres Unicode. Las cadenas solo necesitan comillas cuando podrían malinterpretarse como números, booleanos o null, o cuando contienen comas en contextos de array. Los caracteres CJK, emoji y otros caracteres Unicode funcionan sin comillas.",

  // Footer
  lastUpdated: "Última actualización",
  builtBy: "Construido con Next.js por",
  specLink: "Especificación TOON",
};
