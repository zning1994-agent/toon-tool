export const fr = {
  appName: "Convertisseur JSON-TOON",
  appDescription:
    "Convertissez JSON en TOON (Token-Oriented Object Notation) — un format compact sans crochets, optimisé pour les prompts LLM. Pas de serveur, fonctionne entièrement dans votre navigateur.",

  heroTitle: "Convertisseur JSON-TOON",
  heroSubtitle:
    "Convertissez JSON en TOON — un encodage compact sans crochets, optimisé pour les prompts LLM. Réduit les tokens d'environ 40 %, entièrement réversible, fonctionne dans votre navigateur.",

  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "Valider",

  panelJsonInput: "Entrée JSON",
  panelToonOutput: "Sortie TOON",
  panelToonInput: "Entrée TOON",
  panelJsonOutput: "Sortie JSON",
  panelJsonData: "Données JSON",
  panelToonExpected: "TOON (attendu)",
  panelValidationResult: "Résultat de validation",

  btnCopy: "Copier",
  btnLoadSample: "Charger un exemple",
  btnConvertToToon: "Convertir en TOON",
  btnConvertToJson: "Convertir en JSON",
  btnValidate: "Valider",

  errorInvalidJson: "Syntaxe JSON invalide",
  errorInvalidToon: "Syntaxe TOON invalide",
  errorParse: "Erreur d'analyse",

  validationRoundTrip: "Allers-retours JSON → TOON → JSON",
  validationPass: "Réussi",
  validationFail: "Échoué",
  validationStatus: "Validation",
  validationValid: "TOON valide",
  validationInvalid: "Invalide",

  sectionWhatIsToon: "Qu'est-ce que TOON ?",
  sectionWhatIsToonDesc:
    "TOON (Token-Oriented Object Notation) est un encodage compact et sans crochets des données JSON, conçu pour les prompts LLM. Il utilise l'indentation au lieu des crochets, réduisant le nombre de tokens d'environ 40 %. TOON est entièrement réversible — convertissez en JSON sans perte.",
  formatJson: "JSON",
  formatToon: "TOON",

  sectionWhenToUse: "Quand utiliser TOON",
  useCaseGood: "Idéal pour",
  useCaseBad: "Moins adapté pour",
  useCaseGoodItems: [
    "Fournir des données structurées aux LLMs",
    "Tableaux d'objets uniformes",
    "Réduire les coûts en tokens",
    "Ajouter une validation structurelle",
  ],
  useCaseBadItems: [
    "Structures profondément imbriquées",
    "Tableaux mixtes non uniformes",
    "Chemins critiques en latence",
  ],

  footerTagline: "JSON-TOON — Open source, fonctionne dans votre navigateur.",

  navGithub: "GitHub",

  copied: "Copié !",

  metaTitle: "Convertisseur JSON-TOON — JSON compact pour prompts LLM",
  metaDescription:
    "Convertissez JSON en TOON (Token-Oriented Object Notation) instantanément dans votre navigateur. Réduisez les coûts de tokens LLM d'environ 40 % avec le format TOON sans crochets et lisible. Pas de serveur, pas d'inscription.",
  metaKeywords:
    "JSON vers TOON, format TOON, optimisation prompts LLM, réduction tokens, convertisseur JSON, données structurées IA, JSON sans crochets, toonformat",

  ogTitle: "Convertisseur JSON-TOON",
  ogDescription:
    "Convertissez JSON en TOON — 40 % de tokens en moins pour les prompts LLM. Gratuit, navigateur uniquement, open source.",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  ldName: "Convertisseur JSON-TOON",
  ldDescription:
    "Outil gratuit basé sur le navigateur pour convertir JSON en TOON (Token-Oriented Object Notation), un format compact optimisé pour les prompts LLM.",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  faqTitle: "Questions fréquentes",
  faq1q: "Qu'est-ce que TOON ?",
  faq1a:
    "TOON (Token-Oriented Object Notation) est un encodage compact et sans crochets des données JSON. Il utilise l'indentation au lieu des crochets et des virgules, réduisant le nombre de tokens d'environ 40 % par rapport au JSON standard. TOON est entièrement réversible — vous pouvez repasser au JSON sans perte.",
  faq2q: "Pourquoi utiliser TOON pour les prompts LLM ?",
  faq2a:
    "Les LLMs traitent des tokens, pas des caractères. TOON est conçu pour exprimer les mêmes données avec moins de tokens, réduisant les coûts et l'utilisation du contexte. Le format officiel TOON prétend une réduction d'environ 40 % des tokens sur les structures mixtes.",
  faq3q: "TOON peut-il remplacer JSON ?",
  faq3a:
    "Non. TOON n'est pas destiné à remplacer JSON pour les API, la configuration ou l'échange de données général. Il est spécifiquement optimisé pour les scénarios d'entrée LLM. Pour tout contexte où JSON est la norme (API, bases de données, fichiers de config), continuez à utiliser JSON.",
  faq4q: "Fonctionne-t-il hors ligne ?",
  faq4a:
    "Oui. Toute la conversion se fait entièrement dans votre navigateur avec JavaScript. Aucune donnée n'est envoyée à un serveur.",
  faq5q: "La conversion est-elle sans perte ?",
  faq5a:
    "Oui. TOON est un encodage sans perte du modèle de données JSON. Convertir JSON → TOON → JSON produit un résultat identique, et vice versa.",

  // How to Convert (GEO: step-by-step answer block)
  howToTitle: "Comment convertir JSON en TOON",
  howToStep1Title: "1. Collez votre JSON",
  howToStep1Desc: "Collez ou saisissez des données JSON valides dans le panneau de saisie à gauche.",
  howToStep2Title: "2. Cliquez sur Convertir",
  howToStep2Desc: "Appuyez sur le bouton Convertir. Le convertisseur transforme votre JSON en TOON instantanément dans le navigateur — aucune donnée ne quitte votre machine.",
  howToStep3Title: "3. Copiez la sortie TOON",
  howToStep3Desc: "Copiez la sortie TOON et collez-la dans votre prompt LLM. Attendez-vous à environ 40 % de tokens en moins par rapport au JSON brut.",

  // Syntax Quick Reference
  syntaxTitle: "Référence rapide de la syntaxe TOON",
  syntaxDesc: "TOON utilise cinq motifs fondamentaux pour représenter toute structure JSON. Tous les motifs sont basés sur l'indentation, sans crochets.",

  // Token Savings
  tokenTitle: "Économie de tokens : JSON vs TOON",
  tokenDesc: "Comptages réels de tokens mesurés avec le tokenizer cl100k_base (GPT-4 / Claude). TOON réduit systématiquement l'utilisation de tokens, avec les gains les plus importants sur les données tabulaires.",

  // Format Comparison
  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "Chaque format a ses compromis. TOON est conçu spécifiquement pour l'entrée LLM — pas comme un format de données généraliste.",

  // Additional FAQ
  faq6q: "Quelle économie de tokens TOON permet-il ?",
  faq6a:
    "Sur des jeux de données réels, TOON réduit le nombre de tokens de 30 à 50 % par rapport au JSON standard, mesuré avec cl100k_base (tokenizer GPT-4 / Claude). Les économies sont maximales sur les tableaux d'objets uniformes (format tabulaire), où les clés répétées sont entièrement éliminées.",
  faq7q: "Les LLMs peuvent-ils produire du TOON directement ?",
  faq7a:
    "Oui. Vous pouvez demander aux LLMs de générer une sortie TOON. Cependant, en production, validez toujours la sortie avec un décodeur TOON strict pour détecter les troncatures, champs manquants ou erreurs de syntaxe. La spécification TOON inclut un mode strict spécialement prévu à cet effet.",
  faq8q: "Comment TOON gère-t-il les caractères spéciaux et Unicode ?",
  faq8a:
    "TOON utilise l'encodage UTF-8 et prend en charge tous les caractères Unicode. Les chaînes ne nécessitent des guillemets que lorsqu'elles pourraient être interprétées comme des nombres, des booléens ou null, ou lorsqu'elles contiennent des virgules dans un contexte de tableau. Les caractères CJK, les émojis et les autres caractères Unicode fonctionnent sans guillemets.",

  // Footer
  lastUpdated: "Dernière mise à jour",
  builtBy: "Construit avec Next.js par",
  specLink: "Spécification TOON",
};
