# 0004. Recharts for charts

Status: Accepted

## Context

Phase 2 needs monthly spending trends, category breakdowns (donut/stacked
bar), and budget plan-vs-actual comparisons, with custom tooltips,
responsive layout, and accessible text descriptions for screen readers.
The two candidates considered were Recharts (component-based, built on
D3 internals but hides them) and Visx (low-level, D3-based primitives with
no built-in chart components).

## Decision

Use **Recharts**. It ships composable chart components
(`LineChart`, `BarChart`, `PieChart`, etc.) with sensible defaults for
responsiveness, tooltips, and legends, which lets Phase 2 focus on the
actual data-viz decisions (what to show, how to make it accessible) rather
than on rebuilding axis/tooltip/legend primitives from scratch.

## Consequences

**Positive:** materially faster to build the required chart set; still
demonstrates real charting competence (custom tooltips, accessible
descriptions, responsive containers) without the extra time cost of
hand-building primitives.
**Negative:** less visually distinctive than a hand-built Visx
implementation would be, and less low-level control if a chart ever needs
something Recharts doesn't expose.
**Neutral:** this can be revisited per-chart later — nothing about the FSD
structure (`widgets/SpendingChart`, etc.) couples the rest of the app to
Recharts specifically; a chart could be swapped to Visx without touching
its data layer.

## Alternatives Considered

- **Visx** — more low-level and arguably reads as more senior on its own,
  but costs meaningfully more implementation time (custom axes, tooltips,
  legends per chart) that this project's scope doesn't have to spend to
  make the same point.
- **Chart.js / react-chartjs-2** — canvas-based, harder to style precisely
  to match a design system and less idiomatic in a React/SVG-heavy stack.
