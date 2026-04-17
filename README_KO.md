# TOON 도구 생태계

**TOON (Token-Oriented Object Notation) 개발자 도구 — LLM 프롬프트에 최적화된紧凑한 브래킷 프리 인코딩.**

## 라이브 데모

🔗 **https://toon-tool.ohgiantai.com/**

## 모든 도구

🔗 **[JSON-TOON Converter](https://toon-tool.ohgiantai.com/)** — 10개 언어 인터페이스를 지원하는 양방향 JSON ↔ TOON 변환기.

🔍 **[TOON Validator](https://toon-tool.ohgiantai.com/validator)** — 수정 제안이 포함된 행 단위 TOON 구문 검사기.

🧪 **[TOON Playground](https://toon-tool.ohgiantai.com/playground)** — TOON ↔ JSON 실시간 분할 편집기.

📐 **[TOON Schema](https://toon-tool.ohgiantai.com/schema)** — 타입 정의 및 스키마에 대한 TOON 인스턴스 검증.

🔀 **[TOON Diff](https://toon-tool.ohgiantai.com/diff)** — 키 단위 변경 추적이 가능한 구조적 파일 비교 도구.

🖥️ **[toonjs CLI](https://github.com/zning1994-agent/toon-tool)** — 터미널 도구: TOON ↔ JSON 변환, 검증, diff.

📦 **[toon-language (VS Code)](https://github.com/zning1994-agent/toon-tool/tree/main/vscode-extension)** — VS Code에서 `.toon` / `.toonl` 파일 문법 강조 표시.

## Other Languages / 其他语言

🇺🇸 English · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · 🇰🇷 한국어 · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---

## TOON이란?

TOON (Token-Oriented Object Notation)은 LLM 프롬프트용으로 설계된紧凑한 브래킷 프리 JSON 인코딩입니다. 표준 JSON 대비 토큰数を约 40% 절감하며 완전 가역적입니다.

## 기능

- 🌐 **10개 언어**: 영어,简体中文,繁體中文,日本語,Français,Español,Deutsch,한국어,Português,Русский
- 🔄 **양방향 변환**: JSON ↔ TOON
- ✔️ **검증**: TOON 구문 및 라운드트립 무결성 검사
- 📋 **브라우저 전용**: 데이터가 서버로 전송되지 않음
- 📱 **반응형**: 데스크톱 및 모바일 지원
- 📦 **테이블 배열**: TOON 테이블 배열 구문 완전 지원
- 🔍 **SEO 최적화**: JSON-LD, sitemap, robots.txt, Open Graph
- ⚡ **빠름**: 순수 JavaScript, 즉각 변환

## TOON 구문

### 객체
```
name: Alice
age: 30
```

### 중첩 객체
```
user:
  name: Alice
  age: 30
```

### 인라인 배열 (동일 기본 타입)
```
roles[2]: admin,user
```

### 테이블 배열 (동일 객체)
```
users[2]{id,name}:
  1,Alice
  2,Bob
```

### 혼합 배열
```
items[3]:
  - 1
  - name: Alice
  - [2]: x,y
```

## 빠른 예시

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

## 기술 스택

- Next.js 14 (정적 내보내기)
- TypeScript
- 순수 클라이언트 변환 (백엔드 없음)
- GitHub Pages 배포
- GitHub Actions CI/CD

## 개발

```bash
# 웹 도구
cd web
npm install
npm run dev
npm run build

# CLI 도구
cd ..
npm install
npm run build
node dist/index.js --help
```

## 사양

[TOON 형식 사양](https://toonformat.dev 기반.

## 라이선스

MIT
