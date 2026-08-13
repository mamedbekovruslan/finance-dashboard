# 0005. CSP deferred to deploy-time headers

Status: Accepted

## Context

The project's security scope is explicitly **frontend hardening only** — no
real backend, no auth. Content-Security-Policy is still a relevant control
(mitigating XSS impact even without a backend), but a static Vite SPA has
no server of its own to send real HTTP headers from. The two practical
options are: (a) a `<meta http-equiv="Content-Security-Policy">` tag in
`index.html`, or (b) a real CSP delivered via the hosting platform's HTTP
headers at deploy time (e.g. Netlify `_headers`, Vercel `headers()`).

A meta-tag CSP has to be loosened for Vite's dev server (HMR uses a
websocket connection, inline module scripts, etc.), and there's a real risk
of that dev-mode looseness leaking into what ships to production if the
same tag is reused across environments.

## Decision

Defer the actual CSP to deploy time (Phase 6), delivered via hosting
headers rather than a meta tag. No CSP meta tag is added in Phase 1. When
the app is deployed, add a strict `Content-Security-Policy` header
(`default-src 'self'`, explicit allowances only where the built bundle
needs them) through the hosting platform's headers mechanism, decided
alongside the actual deploy target.

## Consequences

**Positive:** dev mode is never accidentally constrained by a
production-intended policy (or vice versa); the real CSP is written once,
against the actual production bundle's needs, instead of being guessed at
early and patched repeatedly.
**Negative:** there is no CSP at all during Phases 1–5 — acceptable since
there's no real user data or backend during that window, but worth noting
explicitly rather than silently.
**Neutral:** this decision is scoped to CSP delivery mechanism only; other
frontend-hardening practices (no `dangerouslySetInnerHTML`, no secrets in
`VITE_*` vars, masked-only sensitive data) apply from Phase 1 regardless —
see `CLAUDE.md`.

## Alternatives Considered

- **Meta tag CSP now, tightened at deploy** — works in principle, but risks
  the dev-mode-loosened policy being the one that ships if nobody remembers
  to tighten it; deferring avoids the failure mode entirely.
