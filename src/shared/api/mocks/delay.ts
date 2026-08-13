/**
 * Simulated network latency for mock handlers. Zero in the test
 * environment so Vitest runs stay fast; a small randomized delay
 * otherwise so loading states are actually observable in dev.
 */
export function mockDelay(minMs = 200, maxMs = 600): Promise<void> {
  // Vite/Vitest both set MODE to "test" for the test runner, so this is
  // the one signal we need — reaching for `process.env` here would throw
  // in the browser, where `process` is not polyfilled.
  const isTest = import.meta.env.MODE === 'test';
  if (isTest) return Promise.resolve();

  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
