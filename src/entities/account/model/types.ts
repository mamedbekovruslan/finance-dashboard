export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  /**
   * Security-sensitive: this is a MASKED display value only
   * (e.g. "•••• 4242"). Full PANs and CVVs must never be modeled,
   * fetched, or stored anywhere in this app — see CLAUDE.md.
   */
  maskedNumber: string;
  createdAt: string;
}
