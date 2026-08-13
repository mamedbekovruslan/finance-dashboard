import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from './Table';

describe('Table', () => {
  it('renders semantic table markup with scoped header cells', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Balance</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Checking</TableCell>
            <TableCell>$100.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(2);
    expect(columnHeaders[0]).toHaveAttribute('scope', 'col');
    expect(screen.getByRole('cell', { name: 'Checking' })).toBeInTheDocument();
  });
});
