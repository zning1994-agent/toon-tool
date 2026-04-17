# JSON-TOON 변환기

**JSON을 TOON으로 변환 — LLM 프롬프트에 최적화된 간결한 대괄호 없는 인코딩.**

## TOON이란?

TOON(Token-Oriented Object Notation)은 LLM 프롬프트를 위해 설계된 간결하고 대괄호 없는 JSON 데이터 인코딩입니다. 표준 JSON 대비 토큰数を約40%削減し、完全に可逆的です.

## 라이브 데모

🔗 **https://toon-tool.ohgiantai.com/**


## Other Languages / 其他语言

[🇺🇸 English](README.md) · [🇨🇳 简体中文](README_CN.md) · [🇯🇵 日本語](README_JA.md) · [🇪🇸 Español](README_ES.md) · [🇩🇪 Deutsch](README_DE.md) · 🇰🇷 한국어 · [🇧🇷 Português](README_PT.md) · [🇷🇺 Русский](README_RU.md)

---

## 주요 기능

- 🌐 **5개 언어**: 영어, 중국어 간체, 중국어 번체, 일본어, 프랑스어
- 🔄 **양방향 변환**: JSON ↔ TOON
- ✔️ **검증**: TOON 문법 및 라운드-trip 무결성 검사
- 📋 **브라우저 전용**: 서버로 데이터 전송 안 함
- 📱 **반응형**: 데스크톱 및 모바일 지원
- 📦 **테이블 배열**: TOON 테이블 배열 구문 완전 지원
- 🔍 **SEO 최적화**: JSON-LD, sitemap, robots.txt, Open Graph
- ⚡ **빠른 변환**: 순수 JavaScript, 즉각적 결과

## TOON 문법

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
- 순수 클라이언트측 변환 (백엔드 없음)
- GitHub Pages 배포

## 개발

```bash
npm install
npm run dev
npm run build
```

## 사양

[TOON 형식 사양](https://toonformat.dev)에 기반합니다.

## 라이선스

MIT
