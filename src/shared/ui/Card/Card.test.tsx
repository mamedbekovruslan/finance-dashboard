import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders header, body, and footer slots', () => {
    render(
      <Card header="Accounts" footer="5 total">
        <p>Body content</p>
      </Card>,
    );

    expect(screen.getByText('Accounts')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('5 total')).toBeInTheDocument();
  });

  it('renders without optional slots', () => {
    render(<Card>Just body</Card>);
    expect(screen.getByText('Just body')).toBeInTheDocument();
  });
});
