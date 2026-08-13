# 0002. TanStack Query + MSW for the data layer

Status: Accepted

## Context

There's no real backend. The easy path is a flat JSON file imported
directly into components — but that skips everything interesting about
building a UI against a real API: loading/error states, pagination,
latency, retries, and cache invalidation. Since this project exists to
demonstrate real-world frontend patterns, the mock layer needs to behave
like a real API, not a static fixture.

## Decision

- **MSW (Mock Service Worker)** intercepts actual `fetch` calls at the
  network level — in the browser via a service worker
  (`shared/api/mocks/browser.ts`, started unconditionally in `main.tsx`,
  in every environment including the deployed build — there is no real
  backend in any phase of this project's roadmap, so the mock layer is the
  permanent data source, not a dev-only stand-in), and in tests via
  `msw/node` (`shared/api/mocks/server.ts`, wired into `src/test/setup.ts`). Handlers
  return paginated responses (`{ data, page, pageSize, total }`) with
  simulated latency (`shared/api/mocks/delay.ts`, zeroed under
  `MODE === 'test'` so the test suite stays fast).
- **TanStack Query** owns all server-state: caching, background
  refetching, loading/error derivation, and (from Phase 4 on) optimistic
  mutations via `onMutate`/`onError` rollback. Every entity's `model/`
  exposes a `useX` hook wrapping `useQuery`/`useMutation` — components
  never call `fetch` or an entity's `api/` module directly.

Default MSW handlers are deterministic (no randomized failures baked in);
error-path testing is a documented pattern using `server.use(...)`
overrides in individual tests, not default behavior — this keeps the dev
experience predictable while still letting us test error UI deliberately.

## Consequences

**Positive:** the app is exercised against something that behaves like a
real API (network tab shows real requests, real latency, real 4xx/5xx
paths are testable) without standing up a backend; swapping MSW for a real
API later is a near-zero-diff change since `httpClient` and TanStack Query
hooks don't know mocking exists.
**Negative:** MSW adds setup overhead (service worker file, `msw init`,
separate browser/node entry points) compared to importing JSON, and since
it ships in the production bundle (not just dev), it permanently adds to
bundle size — an accepted cost given there is no real backend to swap in.
**Neutral:** this couples "realistic API behavior" to MSW's request
matching rather than to component logic, which is the intended trade-off.

## Alternatives Considered

- **Static JSON import** — trivial, but demonstrates nothing about
  integration, loading states, or pagination; explicitly rejected per the
  project's own stated goals.
- **A tiny real Express/JSON-server backend** — more "real" but adds a
  second deployable and CORS/dev-proxy concerns for no benefit over MSW,
  which intercepts at the network layer already.
