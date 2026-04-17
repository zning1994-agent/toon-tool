export const ru = {
  // App
  appName: "Конвертер JSON-TOON",
  appDescription:
    "Конвертируйте JSON в TOON (Token-Oriented Object Notation) — компактный формат без скобок, оптимизированный для промптов LLM. Без сервера, работает полностью в браузере.",

  // Hero
  heroTitle: "Конвертер JSON-TOON",
  heroSubtitle:
    "Конвертируйте JSON в TOON — компактное кодирование без скобок, оптимизированное для промптов LLM. Снижает количество токенов на ~40%, полностью обратимо, работает в браузере.",

  // Tabs
  tabJsonToToon: "JSON → TOON",
  tabToonToJson: "TOON → JSON",
  tabValidate: "Проверить",

  // Panels
  panelJsonInput: "Ввод JSON",
  panelToonOutput: "Вывод TOON",
  panelToonInput: "Ввод TOON",
  panelJsonOutput: "Вывод JSON",
  panelJsonData: "Данные JSON",
  panelToonExpected: "TOON (ожидаемый)",
  panelValidationResult: "Результат проверки",

  // Buttons
  btnCopy: "Копировать",
  btnLoadSample: "Загрузить пример",
  btnConvertToToon: "Конвертировать в TOON",
  btnConvertToJson: "Конвертировать в JSON",
  btnValidate: "Проверить",

  // Errors
  errorInvalidJson: "Неверный синтаксис JSON",
  errorInvalidToon: "Неверный синтаксис TOON",
  errorParse: "Ошибка разбора",

  // Validation
  validationRoundTrip: "JSON → TOON → JSON туда и обратно",
  validationPass: "Пройдено",
  validationFail: "Не пройдено",
  validationStatus: "Статус проверки",
  validationValid: "TOON валиден",
  validationInvalid: "Недействителен",

  // What is TOON section
  sectionWhatIsToon: "Что такое TOON?",
  sectionWhatIsToonDesc:
    "TOON (Token-Oriented Object Notation) — это компактное кодирование данных JSON без скобок, разработанное для промптов LLM. Использует отступы вместо скобок, сокращая количество токенов на ~40%. TOON полностью обратим — можно конвертировать обратно в JSON без потерь.",
  formatJson: "JSON",
  formatToon: "TOON",

  // When to use
  sectionWhenToUse: "Когда использовать TOON",
  useCaseGood: "Лучше всего для",
  useCaseBad: "Не подходит для",
  useCaseGoodItems: [
    "Подача структурированных данных в LLM",
    "Однородные массивы объектов",
    "Снижение стоимости токенов",
    "Добавление структурной валидации",
  ],
  useCaseBadItems: [
    "Глубоко вложенные структуры",
    "Смешанные неоднородные массивы",
    "Критичные по задержке пути",
  ],

  // Footer
  footerTagline: "JSON-TOON — Открытый исходный код, работает в браузере.",

  // Navigation
  navGithub: "GitHub",

  // Copied toast
  copied: "Скопировано!",

  // Meta / SEO
  metaTitle: "Конвертер JSON-TOON — Компактный JSON для промптов LLM",
  metaDescription:
    "Конвертируйте JSON в TOON (Token-Oriented Object Notation) мгновенно в браузере. Снижайте стоимость токенов LLM на ~40% с помощью формата TOON без скобок. Без сервера, без регистрации.",
  metaKeywords:
    "JSON в TOON, формат TOON, оптимизация промптов LLM, сокращение токенов, конвертер JSON, структурированные данные для ИИ, JSON без скобок, toonformat",

  // Open Graph
  ogTitle: "Конвертер JSON-TOON",
  ogDescription: "Конвертируйте JSON в TOON — на 40% меньше токенов для промптов LLM. Бесплатно, только браузер, открытый исходный код.",
  ogUrl: "https://toon-tool.ohgiantai.com/",
  ogType: "website",

  // JSON-LD
  ldName: "Конвертер JSON-TOON",
  ldDescription:
    "Бесплатный инструмент на основе браузера для конвертации JSON в TOON (Token-Oriented Object Notation), компактный формат, оптимизированный для промптов LLM.",
  ldUrl: "https://toon-tool.ohgiantai.com/",

  // FAQ
  faqTitle: "Часто задаваемые вопросы",
  faq1q: "Что такое TOON?",
  faq1a:
    "TOON (Token-Oriented Object Notation) — это компактное кодирование данных JSON без скобок. Использует отступы вместо скобок и запятых, сокращая количество токенов на ~40% по сравнению со стандартным JSON. TOON полностью обратим — можно конвертировать обратно в JSON без потерь.",
  faq2q: "Зачем использовать TOON для промптов LLM?",
  faq2a:
    "LLM обрабатывают токены, а не символы. TOON разработан для выражения тех же данных с меньшим количеством токенов, снижая стоимость и использование контекста. Официальный формат TOON заявляет о сокращении токенов на ~40% на смешанных структурах.",
  faq3q: "Может ли TOON заменить JSON?",
  faq3a:
    "Нет. TOON не предназначен для замены JSON в API, конфигурации или общем обмене данными. Он специально оптимизирован для сценариев ввода LLM. В любом контексте, где JSON является стандартом (API, базы данных, конфигурационные файлы), продолжайте использовать JSON.",
  faq4q: "Работает ли офлайн?",
  faq4a:
    "Да. Вся конвертация происходит полностью в браузере с помощью JavaScript. Никакие данные не отправляются на сервер.",
  faq5q: "Конвертация без потерь?",
  faq5a:
    "Да. TOON — это кодирование без потерь модели данных JSON. Конвертация JSON → TOON → JSON даёт идентичный результат, и наоборот.",

  // How to Convert (GEO: step-by-step answer block)
  howToTitle: "Как конвертировать JSON в TOON",
  howToStep1Title: "1. Вставьте ваш JSON",
  howToStep1Desc: "Вставьте или введите валидные JSON-данные в панель ввода слева.",
  howToStep2Title: "2. Нажмите «Конвертировать»",
  howToStep2Desc: "Нажмите кнопку «Конвертировать». Конвертер мгновенно преобразует ваш JSON в TOON прямо в браузере — данные не покидают ваш компьютер.",
  howToStep3Title: "3. Скопируйте вывод TOON",
  howToStep3Desc: "Скопируйте вывод TOON и вставьте его в ваш промпт LLM. Ожидайте ~40% меньше токенов по сравнению с исходным JSON.",

  // Syntax Quick Reference
  syntaxTitle: "Краткий справочник по синтаксису TOON",
  syntaxDesc: "TOON использует пять основных шаблонов для представления любой структуры JSON. Все шаблоны основаны на отступах, без скобок.",

  // Token Savings
  tokenTitle: "Экономия токенов: JSON vs TOON",
  tokenDesc: "Реальные подсчёты токенов, измеренные с помощью токенизатора cl100k_base (GPT-4 / Claude). TOON стабильно снижает использование токенов, с наибольшей экономией на табличных данных.",

  // Format Comparison
  comparisonTitle: "TOON vs JSON vs YAML vs CSV",
  comparisonDesc: "У каждого формата есть свои компромиссы. TOON разработан специально для ввода в LLM — это не универсальный формат данных.",

  // Additional FAQ
  faq6q: "Сколько токенов экономит TOON?",
  faq6a:
    "На реальных наборах данных TOON сокращает количество токенов на 30–50% по сравнению со стандартным JSON при измерении с помощью cl100k_base (токенизатор GPT-4 / Claude). Наибольшая экономия достигается на однородных массивах объектов (табличный формат), где повторяющиеся ключи полностью устраняются.",
  faq7q: "Могут ли LLM генерировать TOON напрямую?",
  faq7a:
    "Да. Вы можете поручить LLM генерировать вывод в формате TOON. Однако для продакшн-использования всегда проверяйте вывод строгим декодером TOON, чтобы обнаружить усечения, пропущенные поля или некорректный синтаксис. Спецификация TOON включает строгий режим специально для этой цели.",
  faq8q: "Как TOON обрабатывает спецсимволы и Unicode?",
  faq8a:
    "TOON использует кодировку UTF-8 и поддерживает все символы Unicode. Строки требуют кавычек только когда они могут быть ошибочно интерпретированы как числа, логические значения или null, или когда они содержат запятые в контексте массива. CJK-символы, эмодзи и другие символы Unicode работают без кавычек.",

  // Footer
  lastUpdated: "Последнее обновление",
  builtBy: "Создано на Next.js,",
  specLink: "Спецификация TOON",
};
