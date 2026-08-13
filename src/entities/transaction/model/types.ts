export type TransactionType = 'debit' | 'credit';

export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  description: string;
  amount: number;
  currency: string;
  type: TransactionType;
  date: string;
  /** Masked display value, e.g. "•••• 4242". Never a full PAN. */
  maskedNumber?: string;
}
