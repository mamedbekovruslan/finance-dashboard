# CLAUDE.md

Personal finance dashboard — a portfolio project demonstrating senior-level
React/TypeScript patterns: virtualized large lists, optimistic mutations,
realistic API mocking, and a security-conscious UI for sensitive financial
data. This file exists to save context for future AI-assisted sessions —
read it before exploring the codebase from scratch.

**Before starting new work, check `docs/ROADMAP.md` for current phase
status.** It's the durable source of truth for what's done and what's next
— update it as you complete work, don't rely on chat history.

## Branching

- `main` — stable base branch.
- `dev` — **all development happens here.** Branch from `dev`, PR back into it.
- `main` is not yet the repo's GitHub-configured default branch (that's a
  manual setting change someone with repo admin access needs to make).

## Stack

| Concern            | Choice                                                                           |
| ------------------ | -------------------------------------------------------------------------------- |
| Framework          | React 18 + TypeScript (strict)                                                   |
| Build              | Vite                                                                             |
| Server-state       | TanStack Query (used against MSW mocks to demonstrate real integration patterns) |
| Client-state       | Zustand                                                                          |
| Forms/validation   | React Hook Form + Zod                                                            |
| Tables             | TanStack Table + TanStack Virtual (transactions table, Phase 3)                  |
| Charts             | Recharts                                                                         |
| API mocking        | MSW (Mock Service Worker) — real HTTP interception, not flat JSON                |
| Styling            | CSS Modules                                                                      |
| Routing            | react-router-dom v6                                                              |
| Testing            | Vitest + Testing Library (unit/integration), Playwright (e2e, later phase)       |
| Component workshop | Storybook (later phase)                                                          |

## Commands

| Command                           | Purpose                                                  |
| --------------------------------- | -------------------------------------------------------- |
| `npm run dev`                     | Start dev server (MSW mocking auto-enabled)              |
| `npm run build`                   | Typecheck (`tsc -b`) + production build                  |
| `npm run preview`                 | Preview the production build                             |
| `npm run typecheck`               | `tsc -b --noEmit`                                        |
| `npm run lint` / `lint:fix`       | ESLint (flat config)                                     |
| `npm run format` / `format:check` | Prettier                                                 |
| `npm run test` / `test:watch`     | Vitest                                                   |
| `npm run msw:init`                | Regenerate `public/mockServiceWorker.js` (rarely needed) |

## Architecture: Feature-Sliced Design (FSD)

```
src/
  app/            entry point, providers, router, global styles
  pages/          dashboard, transactions, budgets, accounts, settings
  widgets/        SpendingChart, AccountsSummary, RecentTransactions
  features/       filter-transactions, mask-card-number, create-budget, search-transactions
  entities/       account, transaction, budget, category (types, api, model)
  shared/         ui-kit, hooks, lib, api-client, store, config
```

**Import direction is enforced by ESLint (`eslint-plugin-boundaries`).** A
layer may only import itself or layers below it:

`app → pages → widgets → features → entities → shared`

No upward imports, no lateral imports between unrelated slices at the same
layer (e.g. one widget must not import another widget directly — go through
`entities`/`shared`, or compose at the `pages` level).

Within each entity/feature/widget slice: `model/` (types, hooks, state),
`api/` (fetch functions), `ui/` (components) — not every slice needs all
three yet; add them as the phase that needs them arrives.

## Path aliases

`@app/*` `@pages/*` `@widgets/*` `@features/*` `@entities/*` `@shared/*` → `src/*/*`
(defined once in `tsconfig.app.json`, picked up by Vite via `vite-tsconfig-paths`).

## Where things live (quick map)

| What                                                     | Where                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| HTTP client + typed `ApiError`                           | `src/shared/api/httpClient.ts`, `apiError.ts`                |
| Pagination contract (`Paginated<T>`, `PaginationParams`) | `src/shared/api/types.ts`                                    |
| MSW handlers (per entity)                                | `src/shared/api/mocks/handlers/*.ts`                         |
| MSW browser/node setup                                   | `src/shared/api/mocks/browser.ts` (dev), `server.ts` (tests) |
| TanStack Query client factory                            | `src/shared/api/queryClient.ts`                              |
| Theme store (Zustand)                                    | `src/shared/store/theme-store.ts`                            |
| Base UI kit                                              | `src/shared/ui/{Button,Input,Card,Table}`                    |
| Entity types/api/hooks                                   | `src/entities/<name>/{model,api}`                            |
| Router                                                   | `src/app/router/AppRouter.tsx`                               |
| App shell/nav                                            | `src/app/layout/AppLayout.tsx`                               |
| Test setup (jest-dom, MSW lifecycle)                     | `src/test/setup.ts`                                          |

## Security conventions

This app has no real backend or auth (frontend hardening only — see
`docs/adr/0005-csp-deferred-to-deploy-headers.md`), but sensitive-data
handling is treated seriously since it's the point of the exercise:

- **Never model, fetch, or store a full card number (PAN) or CVV**,
  anywhere — not in types, not in mock fixtures, not in component state.
  Only ever a masked display value, e.g. `•••• 4242` (see
  `Account.maskedNumber` / `Transaction.maskedNumber`).
- No `dangerouslySetInnerHTML`.
- No secrets in `VITE_*` env vars — anything read via `import.meta.env`
  ships to the browser bundle (`src/shared/config/env.ts` is the single
  place that reads it).
- No logging of sensitive fields (account numbers, balances) to the console.
- CSP: deferred to deploy-time hosting headers, not a meta tag — see the ADR.

## Docs

- `docs/adr/` — architecture decision records, one per significant choice.
- `docs/ROADMAP.md` — phase-by-phase task tracker, updated as work lands.
