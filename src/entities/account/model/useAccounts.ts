import { useQuery } from '@tanstack/react-query';
import type { PaginationParams } from '@shared/api/types';
import { fetchAccounts } from '../api/accountApi';

export function useAccounts(params: PaginationParams = {}) {
  return useQuery({
    queryKey: ['accounts', params],
    queryFn: () => fetchAccounts(params),
  });
}
