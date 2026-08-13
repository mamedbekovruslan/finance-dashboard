import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
  ReactNode,
} from 'react';
import styles from './Table.module.css';

/**
 * Presentational, composable table primitives — semantic `<table>`
 * markup with no rows/columns prop API. This is intentional: TanStack
 * Table (Phase 3) drives headless row/column state and renders through
 * these primitives directly, so nothing here needs to change later.
 */

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export function Table({ children, className, ...rest }: TableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={[styles.table, className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...rest}>{children}</thead>;
}

export function TableBody({ children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...rest}>{children}</tbody>;
}

export function TableRow({ children, className, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={[styles.row, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </tr>
  );
}

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function TableHeaderCell({ children, className, scope = 'col', ...rest }: TableHeaderCellProps) {
  return (
    <th className={[styles.headerCell, className].filter(Boolean).join(' ')} scope={scope} {...rest}>
      {children}
    </th>
  );
}

export function TableCell({ children, className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={[styles.cell, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </td>
  );
}
