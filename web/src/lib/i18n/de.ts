export const de = {
  // App
  appName: "JSON-TOON Konverter",
  appDescription:
    "Konvertiere JSON zu TOON (Token-Oriented Object Notation) — ein kompaktes, klammerfreies Format, optimiert für LLM-Prompts. Kein Server nötig, läuft vollständig in deinem Browser.",

  // Hero
  heroTitle: "JSON-TOON Konverter",
  heroSubtitle:
    "Konvertiere JSON zu TOON — eine kompakte, klammerfreie Kodierung, optimiert für LLM-Prompts. Reduziert Token um ~40%, vollständig umkehrbar, läuft in deinem Browser.",

  // Tabs
  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "Validieren",

  // Panels
  panelJsonInput: "JSON-Eingabe",
  panelToonOutput: "TOON-Ausgabe",
  panelToonInput: "TOON-Eingabe",
  panelJsonOutput: "JSON-Ausgabe",
  panelJsonData: "JSON-Daten",
  panelToonExpected: "TOON (erwartet)",
  panelValidationResult: "Validierungsergebnis",

  // Buttons
  btnCopy: "Kopieren",
  btnLoadSample: "Beispiel laden",
  btnConvertToToon: "Zu TOON konvertieren",
  btnConvertToJson: "Zu JSON konvertieren",
  btnValidate: "Validieren",

  // Errors
  errorInvalidJson: "Ungültige JSON-Syntax",
  errorInvalidToon: "Ungültige TOON-Syntax",
  errorParse: "Analysefehler",

  // Validation
  validationRoundTrip: "JSON → TOON → JSON Hin- und Rückweg",
  validationPass: "Bestanden",
  validationFail: "Fehlgeschlagen",
  validationStatus: "Validierungsstatus",
  validationValid: "Gültiges TOON",
  validationInvalid: "Ungültig",

  // What is TOON section
  sectionWhatIsToon: "Was ist TOON?",
  sectionWhatIsToonDesc:
    "TOON (Token-Oriented Object Notation) ist eine kompakte, klammerfreie Kodierung von JSON-Daten, die für LLM-Prompts entwickelt wurde. Es verwendet Einrückung statt Klammern und reduziert die Token-Anzahl um ~40%. TOON ist vollständig umkehrbar — konvertiere verlustfrei zurück zu JSON.",
  formatJson: "JSON",
  formatToon: "TOON",

  // When to use
  sectionWhenToUse: "Wann TOON verwenden",
  useCaseGood: "Am besten für",
  useCaseBad: "Weniger geeignet für",
  useCaseGoodItems: [
    "Strukturierte Daten an LLMs übergeben",
    "Einheitliche Objekt-Arrays",
    "Token-Kosten senken",
    "Strukturelle Validierung hinzufügen",
  ],
  useCaseBadItems: [
    "Tief verschachtelte Strukturen",
    "Gemischte nicht-einheitliche Arrays",
    "Latenzkritische Pfade",
  ],

  // Footer
  footerTagline: "JSON-TOON — Open Source, läuft in deinem Browser.",

  // Navigation
  navGithub: "GitHub",

  // Copied toast
  copied: "Kopiert!",

  // Meta / SEO
  metaTitle: "JSON-TOON Konverter — Kompaktes JSON für LLM-Prompts",
  metaDescription:
    "Konvertiere JSON zu TOON (Token-Oriented Object Notation) sofort in deinem Browser. Reduziere LLM-Token-Kosten um ~40% mit dem klammerfreien, lesbaren TOON-Format. Kein Server, keine Anmeldung.",
  metaKeywords:
    "JSON zu TOON, TOON-Format, LLM-Prompt-Optimierung, Token-Reduzierung, JSON-Konverter, strukturierte Daten für KI, klammerfreies JSON, toonformat",

  // Open Graph
  ogTitle: "JSON-TOON Konverter",
  ogDescription: "Konvertiere JSON zu TOON — 40% weniger Tokens für LLM-Prompts. Kostenlos, nur Browser, Open Source.",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  // JSON-LD
  ldName: "JSON-TOON Konverter",
  ldDescription:
    "Kostenloses browserbasiertes Tool zum Konvertieren von JSON zu TOON (Token-Oriented Object Notation), einem kompakten Format optimiert für LLM-Prompts.",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  // FAQ
  faqTitle: "Häufig gestellte Fragen",
  faq1q: "Was ist TOON?",
  faq1a:
    "TOON (Token-Oriented Object Notation) ist eine kompakte, klammerfreie Kodierung von JSON-Daten. Es verwendet Einrückung statt Klammern und Kommas und reduziert die Token-Anzahl um ~40% gegenüber Standard-JSON. TOON ist vollständig umkehrbar — du kannst verlustfrei zurück zu JSON konvertieren.",
  faq2q: "Warum TOON für LLM-Prompts verwenden?",
  faq2a:
    "LLMs verarbeiten Tokens, keine Zeichen. TOON ist darauf ausgelegt, dieselben Daten mit weniger Tokens auszudrücken, was Kosten und Kontextnutzung reduziert. Das offizielle TOON-Format claimt eine ~40% Token-Reduzierung bei gemischten Strukturen.",
  faq3q: "Kann TOON JSON ersetzen?",
  faq3a:
    "Nein. TOON ist nicht dazu gedacht, JSON für APIs, Konfiguration oder allgemeinen Datenaustausch zu ersetzen. Es ist speziell für LLM-Eingabeszenarien optimiert. Für jeden Kontext, in dem JSON der Standard ist (APIs, Datenbanken, Konfigurationsdateien), verwende weiterhin JSON.",
  faq4q: "Funktioniert es offline?",
  faq4a:
    "Ja. Die gesamte Konvertierung findet vollständig in deinem Browser mit JavaScript statt. Es werden keine Daten an einen Server gesendet.",
  faq5q: "Ist die Konvertierung verlustfrei?",
  faq5a:
    "Ja. TOON ist eine verlustfreie Kodierung des JSON-Datenmodells. Konvertieren von JSON → TOON → JSON erzeugt ein identisches Ergebnis, und umgekehrt.",

  // How to Convert (GEO: step-by-step answer block)
  howToTitle: "So konvertierst du JSON zu TOON",
  howToStep1Title: "1. JSON einfügen",
  howToStep1Desc: "Füge gültige JSON-Daten in das Eingabefeld auf der linken Seite ein oder tippe sie ein.",
  howToStep2Title: "2. Auf Konvertieren klicken",
  howToStep2Desc: "Drücke die Schaltfläche Konvertieren. Der Konverter wandelt dein JSON sofort im Browser in TOON um — keine Daten verlassen deinen Rechner.",
  howToStep3Title: "3. TOON-Ausgabe kopieren",
  howToStep3Desc: "Kopiere die TOON-Ausgabe und füge sie in deinen LLM-Prompt ein. Erwarte ~40% weniger Tokens im Vergleich zum rohen JSON.",

  // Syntax Quick Reference
  syntaxTitle: "TOON Syntax-Kurzreferenz",
  syntaxDesc: "TOON verwendet fünf Kernmuster, um jede JSON-Struktur darzustellen. Alle Muster basieren auf Einrückung ohne Klammern.",

  // Token Savings
  tokenTitle: "Token-Einsparungen: JSON vs TOON",
  tokenDesc: "Tatsächliche Token-Zahlen, gemessen mit dem cl100k_base-Tokenizer (GPT-4 / Claude). TOON reduziert die Token-Nutzung durchgehend, mit den größten Einsparungen bei tabellarischen Daten.",

  // Format Comparison
  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "Jedes Format hat seine Kompromisse. TOON ist speziell für LLM-Eingaben konzipiert — nicht als universelles Datenformat.",

  // Additional FAQ
  faq6q: "Wie viele Tokens spart TOON?",
  faq6a:
    "Bei realen Datensätzen reduziert TOON die Token-Anzahl um 30–50% im Vergleich zu Standard-JSON, gemessen mit cl100k_base (GPT-4 / Claude Tokenizer). Die Einsparungen sind am größten bei einheitlichen Objekt-Arrays (Tabellenformat), bei denen wiederholte Schlüssel vollständig entfallen.",
  faq7q: "Können LLMs TOON direkt ausgeben?",
  faq7a:
    "Ja. Du kannst LLMs anweisen, TOON-Ausgaben zu generieren. Für den Produktiveinsatz solltest du die Ausgabe jedoch immer mit einem strikten TOON-Decoder validieren, um Abbrüche, fehlende Felder oder fehlerhafte Syntax zu erkennen. Die TOON-Spezifikation enthält eigens dafür einen strikten Modus.",
  faq8q: "Wie geht TOON mit Sonderzeichen und Unicode um?",
  faq8a:
    "TOON verwendet UTF-8-Kodierung und unterstützt alle Unicode-Zeichen. Strings müssen nur dann in Anführungszeichen stehen, wenn sie als Zahlen, Booleans oder null fehlinterpretiert werden könnten, oder wenn sie Kommas in Array-Kontexten enthalten. CJK-Zeichen, Emoji und andere Unicode-Zeichen funktionieren ohne Anführungszeichen.",

  // Footer
  lastUpdated: "Zuletzt aktualisiert",
  builtBy: "Erstellt mit Next.js von",
  specLink: "TOON-Spezifikation",
};
