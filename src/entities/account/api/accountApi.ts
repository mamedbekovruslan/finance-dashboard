import { httpClient } from '@shared/api/httpClient';
import type { Paginated, PaginationParams } from '@shared/api/types';
import type { Account } from '../model/types';

export function fetchAccounts(params: PaginationParams = {}): Promise<Paginated<Account>> {
  return httpClient.get<Paginated<Account>>('/accounts', { params });
}
