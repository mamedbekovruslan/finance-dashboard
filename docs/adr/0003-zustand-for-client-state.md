# 0003. Zustand for client state

Status: Accepted

## Context

Server-state (accounts, transactions, budgets) is fully owned by TanStack
Query (ADR 0002). What's left is genuine client-only state: filters/search
on the transactions table, UI state (modals, toggles), and the theme
preference. This is a small, low-ceremony slice of state that doesn't
benefit from a full Redux-style store, but does need to be shared across
components that aren't necessarily in the same subtree (e.g. theme toggle
in `settings`, applied globally in `app`).

## Decision

Use Zustand for all client-only state. Each concern gets its own small
store under `shared/store/` (e.g. `theme-store.ts`) rather than one large
combined store — this keeps stores independently testable and avoids
unrelated state changes causing unrelated re-renders. Persisted state (like
theme) uses `zustand/middleware`'s `persist` to `localStorage`.

## Consequences

**Positive:** minimal boilerplate (no actions/reducers/dispatch ceremony),
no Provider wrapping required, selective subscriptions avoid unnecessary
re-renders out of the box, small bundle footprint.
**Negative:** less structure than Redux Toolkit for very large state
trees — an acceptable trade-off at this app's scale, but would need
revisiting if client-state complexity grew substantially.
**Neutral:** Zustand stores and TanStack Query caches are deliberately
kept separate — a store must never duplicate data that TanStack Query
already owns (e.g. don't mirror account balances into a Zustand store).

## Alternatives Considered

- **React Context + useReducer** — no extra dependency, but re-render
  granularity is worse (any context consumer re-renders on any change) and
  persistence would be hand-rolled.
- **Redux Toolkit** — more structure and devtools maturity than this
  app's actual state complexity justifies; would read as over-engineering
  for filters/theme/UI toggles.
