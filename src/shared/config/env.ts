/**
 * Central place to read `import.meta.env`. Keeping env access behind a
 * single module makes it easy to audit what config the client bundle
 * actually consumes — see CLAUDE.md security conventions (never put
 * secrets in VITE_* variables; anything read here ships to the browser).
 */
export const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;
