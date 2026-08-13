# 0001. Feature-Sliced Design architecture

Status: Accepted

## Context

The app has a handful of clearly separable domains (accounts, transactions,
budgets, categories) and cross-cutting concerns (a base UI kit, API client,
theme). A flat `components/`+`hooks/`+`utils/` layout tends to accumulate
implicit coupling as an app grows past a few pages, which is exactly the
kind of thing a senior-level portfolio piece should demonstrate handling
well. We need a structure that scales past "toy app" size and makes import
direction (what's allowed to depend on what) explicit and enforceable.

## Decision

Adopt Feature-Sliced Design (FSD) with six layers, each importable only by
the layers above it:

```
app → pages → widgets → features → entities → shared
```

- `app` — providers, router, global styles, composition root.
- `pages` — route-level components that compose widgets/features.
- `widgets` — self-contained UI blocks composed of features/entities (e.g. `SpendingChart`).
- `features` — user-facing actions with logic (e.g. `filter-transactions`, `mask-card-number`).
- `entities` — domain models: types, API calls, and read hooks per domain object.
- `shared` — UI kit, generic hooks, API client, config — no domain knowledge.

Import direction is enforced with `eslint-plugin-boundaries` in
`eslint.config.js`, not just convention — a violation is a lint error, not
a code review nitpick.

## Consequences

**Positive:** dependency direction is machine-checked; a new contributor
(or AI session) can predict where a given piece of code belongs without
asking; each entity is a clean, independently testable unit.
**Negative:** more directories/boilerplate for a project this size than a
flatter structure would need; some Phase-1 slices are near-empty
placeholders until later phases fill them in.
**Neutral:** FSD is opinionated about _where_ code lives, not about state
management or data-fetching choices — those are separate ADRs.

## Alternatives Considered

- **Flat `components/`/`hooks/`/`services/`** — simpler to start, but
  doesn't scale and doesn't demonstrate the architectural judgment this
  project is meant to show.
- **Domain-driven `modules/<domain>/`** without FSD's layer distinction
  between entities/features/widgets — coarser-grained, harder to reuse a
  domain's data layer independently of its UI.
