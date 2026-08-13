export interface Budget {
  id: string;
  categoryId: string;
  name: string;
  limit: number;
  spent: number;
  currency: string;
  periodStart: string;
  periodEnd: string;
}
