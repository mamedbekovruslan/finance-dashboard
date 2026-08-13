import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@shared/api/queryClient';
import { AccountsPage } from './AccountsPage';

function renderWithProviders() {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AccountsPage />
    </QueryClientProvider>,
  );
}

describe('AccountsPage', () => {
  it('loads mocked accounts through TanStack Query + MSW and renders masked card numbers', async () => {
    renderWithProviders();

    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);

    const table = await screen.findByRole('table', { name: 'Accounts' });
    expect(table).toBeInTheDocument();

    const maskedCells = screen.getAllByText(/^•{4}\s\d{4}$/);
    expect(maskedCells.length).toBeGreaterThan(0);
  });
});
