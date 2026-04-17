import type { Metadata, Viewport } from "next";
import { LangProvider } from "@/components/LangProvider";
import { BUILD_DATE } from "@/lib/constants";
import "./globals.css";

const SITE_URL = "https://toon-tool.ohgiantai.com";
const GITHUB_URL = "https://github.com/zning1994-agent/toon-tool";

// --- JSON-LD Structured Data ---
// All JSON-LD below is static, build-time content (no user input) — safe for inline script injection.

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OhGiant AI",
  url: "https://ohgiantai.com",
  logo: `${SITE_URL}/favicon.svg`,
  sameAs: [GITHUB_URL],
  description: "Open-source developer tools for AI and LLM workflows.",
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JSON-TOON Converter",
  url: SITE_URL,
  description:
    "Free browser-based tool to convert JSON to TOON (Token-Oriented Object Notation), a compact format optimized for LLM prompts. Reduces token count by ~40%.",
  inLanguage: ["en", "zh-CN", "zh-TW", "ja", "fr", "es", "de", "ko", "pt", "ru"],
  publisher: { "@type": "Organization", name: "OhGiant AI" },
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON-TOON Converter",
  url: SITE_URL,
  description:
    "Convert JSON to TOON (Token-Oriented Object Notation) — a compact, bracket-free encoding for LLM prompts. Reduces token cost by ~40%.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  applicationSubCategory: "Data Conversion Tool",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "JSON to TOON conversion",
    "TOON to JSON conversion",
    "Round-trip validation",
    "Browser-only processing",
    "10-language interface",
    "Tabular array optimization",
  ],
  softwareVersion: "1.0",
  datePublished: BUILD_DATE,
  dateModified: BUILD_DATE,
  author: { "@type": "Organization", name: "OhGiant AI" },
  isAccessibleForFree: true,
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is TOON?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TOON (Token-Oriented Object Notation) is a compact, bracket-free encoding of JSON data designed for LLM prompts. It uses indentation instead of brackets, reducing token count by ~40% compared to standard JSON. TOON is fully reversible — you can convert back to JSON losslessly.",
      },
    },
    {
      "@type": "Question",
      name: "Why use TOON for LLM prompts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LLMs process tokens, not characters. TOON is designed to express the same data with fewer tokens, reducing cost and context usage. The official TOON format claims ~40% token reduction on mixed structures.",
      },
    },
    {
      "@type": "Question",
      name: "Is TOON a replacement for JSON?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. TOON is not meant to replace JSON for APIs, configuration, or general data exchange. It is specifically optimized for LLM input scenarios.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All conversion happens entirely in your browser using JavaScript. No data is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Is the conversion lossless?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TOON is a lossless encoding of the JSON data model. Converting JSON to TOON to JSON produces identical output, and vice versa.",
      },
    },
    {
      "@type": "Question",
      name: "What tokenizer savings does TOON achieve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On real-world datasets, TOON reduces token count by 30 to 50 percent compared to standard JSON when measured with cl100k_base (GPT-4/Claude tokenizer). The savings are highest on uniform object arrays (tabular format), where repeated keys are eliminated entirely.",
      },
    },
    {
      "@type": "Question",
      name: "Can LLMs output TOON directly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can instruct LLMs to generate TOON output. For production use, always validate with a strict TOON decoder to catch truncation, missing fields, or malformed syntax.",
      },
    },
    {
      "@type": "Question",
      name: "How does TOON handle special characters and Unicode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TOON uses UTF-8 encoding and supports all Unicode characters. Strings only need quoting when they could be misinterpreted as numbers, booleans, or null, or when they contain commas in array contexts.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert JSON to TOON",
  description:
    "Convert JSON data to TOON format in 3 steps using this free browser-based converter. No installation or signup required.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "JSON-TOON Converter",
    url: SITE_URL,
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Paste your JSON data",
      text: "Paste or type valid JSON data into the input panel on the left side of the converter.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Click Convert",
      text: "Press the Convert to TOON button. The converter transforms your JSON to TOON instantly in the browser. No data leaves your machine.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy the TOON output",
      text: "Copy the TOON output and paste it into your LLM prompt. Expect approximately 40 percent fewer tokens compared to the raw JSON.",
    },
  ],
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "JSON-TOON Converter",
      item: SITE_URL,
    },
  ],
};

// Combine all JSON-LD into a single script tag for cleaner HTML
const allJsonLd = [
  jsonLdOrg,
  jsonLdWebSite,
  jsonLdSoftware,
  jsonLdFAQ,
  jsonLdHowTo,
  jsonLdBreadcrumb,
];

// Pre-serialize at build time — all data is static/trusted, no user input involved.
// Using dangerouslySetInnerHTML is required for <script> tags in React/Next.js.
// This is safe because the content is entirely static build-time data with no user input.

// --- Viewport ---
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

// --- Metadata ---

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JSON-TOON Converter — Compact JSON for LLM Prompts | 40% Token Savings",
    template: "%s | JSON-TOON Converter",
  },
  description:
    "Convert JSON to TOON (Token-Oriented Object Notation) instantly in your browser. Reduce LLM token costs by ~40% with bracket-free, human-readable TOON format. Free, open source, no signup. Supports GPT-4, Claude, Gemini prompts.",
  keywords: [
    "JSON to TOON",
    "TOON format",
    "TOON converter",
    "LLM prompt optimization",
    "token reduction",
    "JSON converter online",
    "structured data for AI",
    "bracket-free JSON",
    "toonformat",
    "JSON compact format",
    "AI prompt engineering",
    "GPT-4 token savings",
    "Claude prompt format",
    "reduce LLM cost",
    "JSON alternative for LLM",
  ],
  authors: [{ name: "OhGiant AI", url: "https://ohgiantai.com" }],
  creator: "OhGiant AI",
  publisher: "OhGiant AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "JSON-TOON Converter",
    title: "JSON-TOON Converter — 40% Fewer Tokens for LLM Prompts",
    description:
      "Convert JSON to TOON — save ~40% tokens for GPT-4, Claude, and Gemini prompts. Free, browser-only, open source.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JSON-TOON Converter — Convert JSON to compact TOON format for LLM prompts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON-TOON Converter — 40% Fewer Tokens for LLM Prompts",
    description:
      "Convert JSON to TOON — save ~40% tokens for GPT-4, Claude, Gemini. Free, browser-only, open source.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en": SITE_URL,
      "zh-CN": `${SITE_URL}?lang=zh-CN`,
      "zh-TW": `${SITE_URL}?lang=zh-TW`,
      "ja": `${SITE_URL}?lang=ja`,
      "fr": `${SITE_URL}?lang=fr`,
      "es": `${SITE_URL}?lang=es`,
      "de": `${SITE_URL}?lang=de`,
      "ko": `${SITE_URL}?lang=ko`,
      "pt": `${SITE_URL}?lang=pt`,
      "ru": `${SITE_URL}?lang=ru`,
    },
  },
  verification: {
    google: "google0b80f2f82d2f60b3",
  },
  other: {
    "citation_title": "JSON-TOON Converter",
    "citation_author": "OhGiant AI",
    "citation_date": BUILD_DATE,
    "citation_online_date": BUILD_DATE,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {allJsonLd.map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
