import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import type { Transaction, TransactionType } from '@entities/transaction';
import type { Paginated } from '@shared/api/types';
import { mockDelay } from '../delay';
import { CATEGORIES } from './categories';

faker.seed(44);

const ACCOUNT_IDS = ['acc_1', 'acc_2', 'acc_3', 'acc_4', 'acc_5'];

function maskedNumber(): string {
  const lastFour = faker.finance.creditCardNumber('####').slice(-4);
  return `•••• ${lastFour}`;
}

const TRANSACTIONS: Transaction[] = Array.from({ length: 5 }, (_, i) => {
  const type: TransactionType = faker.helpers.arrayElement(['debit', 'credit']);
  const category = faker.helpers.arrayElement(CATEGORIES);
  return {
    id: `txn_${i + 1}`,
    accountId: faker.helpers.arrayElement(ACCOUNT_IDS),
    categoryId: category.id,
    description: faker.commerce.productName(),
    amount: Number(faker.finance.amount({ min: 5, max: 500, dec: 2 })),
    currency: 'USD',
    type,
    date: faker.date.recent({ days: 30 }).toISOString(),
    maskedNumber: maskedNumber(),
  };
});

export const transactionsHandlers = [
  http.get('/api/transactions', async ({ request }) => {
    await mockDelay();

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10');

    const start = (page - 1) * pageSize;
    const data = TRANSACTIONS.slice(start, start + pageSize);

    const body: Paginated<Transaction> = {
      data,
      page,
      pageSize,
      total: TRANSACTIONS.length,
    };

    return HttpResponse.json(body);
  }),
];
