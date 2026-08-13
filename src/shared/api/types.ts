/**
 * Shared pagination contract used by every mock API handler and every
 * entity API client. Keeping this in one place means the shape is
 * consistent across accounts / transactions / budgets / categories,
 * and TanStack Table pagination (Phase 3) can rely on it directly.
 */
export interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  /** Extra query params (filters, search, etc.) added by later phases. */
  [key: string]: string | number | boolean | undefined;
}
