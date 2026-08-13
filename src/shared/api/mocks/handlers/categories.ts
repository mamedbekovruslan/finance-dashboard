import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import type { Category } from '@entities/category';
import type { Paginated } from '@shared/api/types';
import { mockDelay } from '../delay';

faker.seed(43);

const CATEGORY_DEFS: Array<Pick<Category, 'name' | 'icon'>> = [
  { name: 'Groceries', icon: '🛒' },
  { name: 'Dining', icon: '🍽️' },
  { name: 'Transportation', icon: '🚗' },
  { name: 'Utilities', icon: '💡' },
  { name: 'Entertainment', icon: '🎬' },
];

const CATEGORIES: Category[] = CATEGORY_DEFS.map((def, i) => ({
  id: `cat_${i + 1}`,
  name: def.name,
  icon: def.icon,
  color: faker.color.rgb(),
}));

export const categoriesHandlers = [
  http.get('/api/categories', async ({ request }) => {
    await mockDelay();

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10');

    const start = (page - 1) * pageSize;
    const data = CATEGORIES.slice(start, start + pageSize);

    const body: Paginated<Category> = {
      data,
      page,
      pageSize,
      total: CATEGORIES.length,
    };

    return HttpResponse.json(body);
  }),
];

export { CATEGORIES };
