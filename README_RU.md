# Экосистема TOON Tool

**Инструменты для разработчиков TOON (Token-Oriented Object Notation) — компактное безскобочное кодирование, оптимизированное для промптов LLM.**

## Демо

🔗 **https://toon-tool.ohgiantai.com/**

## Все инструменты

🔗 **[JSON-TOON Converter](https://toon-tool.ohgiantai.com/)** — Двунаправленный конвертер JSON ↔ TOON с интерфейсом на 10 языках.

🔍 **[TOON Validator](https://toon-tool.ohgiantai.com/validator)** — Проверка синтаксиса TOON на уровне строк с предложениями по исправлению.

🧪 **[TOON Playground](https://toon-tool.ohgiantai.com/playground)** — Разделенный редактор реального времени для предпросмотра TOON ↔ JSON.

📐 **[TOON Schema](https://toon-tool.ohgiantai.com/schema)** — Определение типов и валидация экземпляров TOON по схемам.

🔀 **[TOON Diff](https://toon-tool.ohgiantai.com/diff)** — Структурное сравнение файлов с отслеживанием изменений на уровне ключей.

🖥️ **[toonjs CLI](https://github.com/zning1994-agent/toon-tool)** — Терминальный инструмент: конвертация, валидация и diff TOON ↔ JSON.

📦 **[toon-language (VS Code)](https://github.com/zning1994-agent/toon-tool/tree/main/vscode-extension)** — Подсветка синтаксиса для файлов `.toon` / `.toonl` в VS Code.

## Other Languages / 其他语言

🇺🇸 English · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · [🇰🇷 한국어](README_KO.md) · [🇧🇷 Português](README_PT.md) · 🇷🇺 Русский

---

## Что такое TOON?

TOON (Token-Oriented Object Notation) — это компактное безскобочное кодирование данных JSON, разработанное для промптов LLM. Сокращает количество токенов на ~40% по сравнению со стандартным JSON, при этом полностью обратимо.

## Функции

- 🌐 **10 языков**: английский, 简体中文, 繁體中文, 日本語, Français, Español, Deutsch, 한국어, Português, Русский
- 🔄 **Двунаправленная конвертация**: JSON ↔ TOON
- ✔️ **Валидация**: Проверка синтаксиса TOON и целостности round-trip
- 📋 **Только браузер**: Данные не отправляются на сервер
- 📱 **Адаптивный дизайн**: Работает на десктопе и мобильных
- 📦 **Табличные массивы**: Полная поддержка табличного синтаксиса массивов TOON
- 🔍 **SEO-оптимизация**: JSON-LD, sitemap, robots.txt, Open Graph
- ⚡ **Быстро**: Чистый JavaScript, мгновенная конвертация

## Синтаксис TOON

### Объект
```
name: Alice
age: 30
```

### Вложенный объект
```
user:
  name: Alice
  age: 30
```

### Инлайн-массив (однотипные примитивы)
```
roles[2]: admin,user
```

### Табличный массив (однотипные объекты)
```
users[2]{id,name}:
  1,Alice
  2,Bob
```

### Смешанный массив
```
items[3]:
  - 1
  - name: Alice
  - [2]: x,y
```

## Быстрый пример

**JSON:**
```json
{
  "user": "Ning",
  "role": "engineer",
  "skills": ["Python", "Go"]
}
```

**TOON:**
```
user: Ning
role: engineer
skills[2]: Python,Go
```

## Стек технологий

- Next.js 14 (Статический экспорт)
- TypeScript
- Чистая клиентская конвертация (без бэкенда)
- Деплой на GitHub Pages
- CI/CD через GitHub Actions

## Разработка

```bash
# Веб-инструменты
cd web
npm install
npm run dev
npm run build

# CLI-инструменты
cd ..
npm install
npm run build
node dist/index.js --help
```

## Спецификация

На основе [Спецификации формата TOON](https://toonformat.dev).

## Лицензия

MIT
