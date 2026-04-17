// Build-time constant — evaluated at Next.js build/render time.
// Both layout.tsx (server) and page.tsx (client) import from here.
export const BUILD_DATE = new Date().toISOString().split("T")[0];
