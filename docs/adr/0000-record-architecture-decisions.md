# 0000. Record architecture decisions

Status: Accepted

## Context

This project makes several non-obvious architectural choices (FSD layering,
a specific data-fetching split between TanStack Query and MSW, Zustand over
Redux/Context, Recharts over Visx, a deferred CSP strategy). Without a
record, the reasoning behind these choices is lost as soon as the
conversation that produced them scrolls out of context — which matters a
lot in an AI-assisted codebase where sessions are stateless.

## Decision

We keep lightweight Architecture Decision Records under `docs/adr/`, one
file per significant decision, numbered sequentially. Each record follows:

```
# NNNN. Title
Status: Accepted | Superseded by NNNN | Deprecated
## Context
## Decision
## Consequences
## Alternatives Considered (optional)
```

Records are immutable once accepted — a changed decision gets a new ADR
that supersedes the old one, rather than editing history in place.

## Consequences

**Positive:** future sessions (human or AI) can recover the "why" behind a
choice without re-deriving it or asking the person who made it.
**Negative:** one more thing to keep updated; an ADR that's never written
is worse than no process, so this only works if it's kept lightweight.
**Neutral:** ADRs record decisions, not implementation detail — they don't
replace code comments or `CLAUDE.md`'s day-to-day reference material.
