import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import type { Budget } from '@entities/budget';
import type { Paginated } from '@shared/api/types';
import { mockDelay } from '../delay';
import { CATEGORIES } from './categories';

faker.seed(45);

const now = new Date();
const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const BUDGETS: Budget[] = CATEGORIES.slice(0, 4).map((category, i) => {
  const limit = Number(faker.finance.amount({ min: 150, max: 800, dec: 0 }));
  return {
    id: `bud_${i + 1}`,
    categoryId: category.id,
    name: `${category.name} Budget`,
    limit,
    spent: Number(faker.finance.amount({ min: 0, max: limit, dec: 2 })),
    currency: 'USD',
    periodStart: periodStart.toISOString(),
    periodEnd: periodEnd.toISOString(),
  };
});

export const budgetsHandlers = [
  http.get('/api/budgets', async ({ request }) => {
    await mockDelay();

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10');

    const start = (page - 1) * pageSize;
    const data = BUDGETS.slice(start, start + pageSize);

    const body: Paginated<Budget> = {
      data,
      page,
      pageSize,
      total: BUDGETS.length,
    };

    return HttpResponse.json(body);
  }),
];
