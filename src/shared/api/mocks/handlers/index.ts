import { accountsHandlers } from './accounts';
import { transactionsHandlers } from './transactions';
import { budgetsHandlers } from './budgets';
import { categoriesHandlers } from './categories';

export const handlers = [...accountsHandlers, ...transactionsHandlers, ...budgetsHandlers, ...categoriesHandlers];
