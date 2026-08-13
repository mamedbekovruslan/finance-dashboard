# Roadmap

This file is the durable source of truth for project progress across
sessions — update it as work completes, don't rely on chat history to
reconstruct state. See `CLAUDE.md` for architecture/commands and
`docs/adr/` for the reasoning behind specific decisions.

## Phase 1 — Setup, MSW mocks, base design system

- [x] Vite + React 18 + TypeScript (strict) scaffold
- [x] Path aliases (`@app/*`, `@pages/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*`)
- [x] ESLint (flat config, FSD import-boundary enforcement) + Prettier
- [x] FSD folder skeleton (`app`, `pages`, `widgets`, `features`, `entities`, `shared`)
- [x] React Router v6 wired, 5 routes reachable (dashboard/transactions/budgets/accounts/settings)
- [x] TanStack Query provider (+ devtools in dev only)
- [x] Zustand theme store skeleton (`shared/store/theme-store.ts`) — dark mode _application_ is Phase 5
- [x] Base UI kit: `Button`, `Input`, `Card`, `Table` (CSS Modules, accessible markup, unit-tested)
- [x] MSW: browser worker (dev) + node server (tests), handlers for accounts/transactions/budgets/categories with simulated latency and pagination
- [x] `accounts` entity fully wired end-to-end: `useAccounts()` → MSW → `AccountsPage` rendering through `Card`/`Table`, with loading/error/empty states
- [x] `transactions`/`budgets`/`categories` entities stubbed (types + api client), matching the pagination contract — full UI arrives in their respective phases
- [x] Vitest + Testing Library configured; integration test proves MSW + TanStack Query + entity + UI kit work together (`AccountsPage.test.tsx`)
- [x] `CLAUDE.md`, `docs/adr/0000`–`0005`, this roadmap
- [x] Verification green: `typecheck`, `lint`, `test`, `build`
- [ ] Storybook — explicitly deferred to Phase 5, not started

**Deviations from the original Phase 1 sketch:** package manager is npm
(not pnpm), styling is CSS Modules (not Tailwind/styled-components), CSP is
documented but not implemented until deploy (see ADR 0005) — all decided
explicitly with the project owner, not silent scope changes.

## Phase 2 — Dashboard: accounts summary + charts

- [ ] `AccountsSummary` widget (extend beyond the raw Phase-1 table: totals, per-type breakdown)
- [ ] `SpendingChart` widget (Recharts): monthly trend, category breakdown (donut/stacked bar)
- [ ] Budget plan-vs-actual comparison chart
- [ ] Custom tooltips, responsive containers
- [ ] Accessible chart descriptions (`aria-label` text summaries for screen readers)
- [ ] Skeleton loaders / empty states for dashboard widgets

## Phase 3 — Transactions: table, virtualization, filters, search, masking

- [ ] TanStack Table + TanStack Virtual transactions table (thousands of mock rows)
- [ ] Server-side (mock) pagination
- [ ] Debounced search
- [ ] Multi-filter: account, category, date range, amount
- [ ] `mask-card-number` feature: masked-by-default, show/hide toggle with auto-hide timeout, copy-to-clipboard with notification
- [ ] Transaction edit form (React Hook Form + Zod)

## Phase 4 — Budgets: CRUD, progress bars, optimistic updates

- [ ] Budget CRUD (React Hook Form + Zod for create/edit)
- [ ] Progress bars (spent vs. limit)
- [ ] Optimistic updates via TanStack Query `onMutate` + rollback on error

## Phase 5 — Dark theme, a11y audit, tests, Storybook

- [ ] Dark theme applied (CSS custom properties + `prefers-color-scheme` + persisted override, no FOUC) — store already exists from Phase 1
- [ ] Accessibility audit pass
- [ ] Expanded unit/integration test coverage
- [ ] Playwright e2e (a couple of key scenarios)
- [ ] Storybook for key reusable components
- [ ] Error boundaries with retry; offline banner (`navigator.onLine` / online/offline events)

## Phase 6 — Polish, README, deploy

- [ ] `README.md` architecture write-up (expand beyond the short pointer version from Phase 1)
- [ ] CSP via hosting headers (see ADR 0005) — the one item explicitly deferred from Phase 1
- [ ] Deploy to Vercel or Netlify
- [ ] Final visual/UX polish pass

## Change Log

- **2026-08-13** — Phase 1 scaffold complete: FSD skeleton, UI kit, MSW +
  TanStack Query data layer with `accounts` fully wired end-to-end,
  Vitest configured with a passing integration test, full documentation
  set (`CLAUDE.md`, ADRs 0000–0005, this roadmap). All verification
  scripts (`typecheck`, `lint`, `test`, `build`) green. Repo restructured
  to a `main`/`dev` branch strategy — all development happens on `dev`.
- **2026-08-13** — Deploy readiness: MSW now starts unconditionally (was
  dev-only), since this project has no real backend in any phase —
  fixed before it could ship as a broken production build. Added
  `vercel.json` SPA rewrite so client-side routes resolve on direct
  navigation. Verified against a production build in headless Chromium.
