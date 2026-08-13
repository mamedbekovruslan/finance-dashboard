import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import type { Account, AccountType } from '@entities/account';
import type { Paginated } from '@shared/api/types';
import { mockDelay } from '../delay';

const ACCOUNT_TYPES: AccountType[] = ['checking', 'savings', 'credit', 'investment'];

/**
 * Builds a masked-only display number, e.g. "•••• 4242". We never
 * generate, store, or expose a full PAN or a CVV anywhere in mock
 * fixtures — see CLAUDE.md security conventions.
 */
function maskedNumber(): string {
  const lastFour = faker.finance.creditCardNumber('####').slice(-4);
  return `•••• ${lastFour}`;
}

faker.seed(42);

const ACCOUNTS: Account[] = Array.from({ length: 5 }, (_, i) => {
  const type = ACCOUNT_TYPES[i % ACCOUNT_TYPES.length] as AccountType;
  return {
    id: `acc_${i + 1}`,
    name: `${faker.company.name()} ${type === 'credit' ? 'Credit Card' : 'Account'}`,
    type,
    balance: Number(faker.finance.amount({ min: type === 'credit' ? -5000 : 100, max: 25000, dec: 2 })),
    currency: 'USD',
    maskedNumber: maskedNumber(),
    createdAt: faker.date.past({ years: 3 }).toISOString(),
  };
});

export const accountsHandlers = [
  http.get('/api/accounts', async ({ request }) => {
    await mockDelay();

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10');

    const start = (page - 1) * pageSize;
    const data = ACCOUNTS.slice(start, start + pageSize);

    const body: Paginated<Account> = {
      data,
      page,
      pageSize,
      total: ACCOUNTS.length,
    };

    return HttpResponse.json(body);
  }),
];
