import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/** Browser (dev) MSW worker — started conditionally from main.tsx. */
export const worker = setupWorker(...handlers);
