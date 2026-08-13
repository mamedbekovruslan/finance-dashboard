import { useAccounts } from '@entities/account';
import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@shared/ui';
import { capitalize, formatCurrency } from '@shared/lib/format';

export function AccountsPage() {
  const { data, isPending, isError, error } = useAccounts({ pageSize: 20 });

  return (
    <section>
      <h1>Accounts</h1>
      <Card>
        {isPending ? (
          <p role="status">Loading accounts…</p>
        ) : isError ? (
          <p role="alert">
            Failed to load accounts: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        ) : data.data.length === 0 ? (
          <p>No accounts yet.</p>
        ) : (
          <Table aria-label="Accounts">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Card</TableHeaderCell>
                <TableHeaderCell>Balance</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{capitalize(account.type)}</TableCell>
                  <TableCell>{account.maskedNumber}</TableCell>
                  <TableCell>{formatCurrency(account.balance, account.currency)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </section>
  );
}
