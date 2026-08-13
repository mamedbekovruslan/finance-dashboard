import { httpClient } from '@shared/api/httpClient';
import type { Paginated, PaginationParams } from '@shared/api/types';
import type { Transaction } from '../model/types';

export function fetchTransactions(params: PaginationParams = {}): Promise<Paginated<Transaction>> {
  return httpClient.get<Paginated<Transaction>>('/transactions', { params });
}
