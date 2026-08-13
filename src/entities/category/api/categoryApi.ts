import { httpClient } from '@shared/api/httpClient';
import type { Paginated, PaginationParams } from '@shared/api/types';
import type { Category } from '../model/types';

export function fetchCategories(params: PaginationParams = {}): Promise<Paginated<Category>> {
  return httpClient.get<Paginated<Category>>('/categories', { params });
}
