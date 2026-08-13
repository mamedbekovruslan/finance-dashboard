import { httpClient } from '@shared/api/httpClient';
import type { Paginated, PaginationParams } from '@shared/api/types';
import type { Budget } from '../model/types';

export function fetchBudgets(params: PaginationParams = {}): Promise<Paginated<Budget>> {
  return httpClient.get<Paginated<Budget>>('/budgets', { params });
}
