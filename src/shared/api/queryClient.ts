import { QueryClient } from '@tanstack/react-query';

/**
 * Factory (not a singleton) so tests and the app entry point each get
 * an isolated client — sharing one across tests would leak cache state
 * between test cases.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
