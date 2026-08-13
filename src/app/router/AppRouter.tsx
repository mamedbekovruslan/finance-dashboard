import { Navigate, Route, Routes } from 'react-router-dom';
import { AccountsPage } from '@pages/accounts';
import { BudgetsPage } from '@pages/budgets';
import { DashboardPage } from '@pages/dashboard';
import { SettingsPage } from '@pages/settings';
import { TransactionsPage } from '@pages/transactions';
import { AppLayout } from '../layout/AppLayout';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="budgets" element={<BudgetsPage />} />
        <Route path="accounts" element={<AccountsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
