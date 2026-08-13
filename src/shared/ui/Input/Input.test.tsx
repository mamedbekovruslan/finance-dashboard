import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the input via htmlFor', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');

    await user.type(input, 'me@example.com');
    expect(input).toHaveValue('me@example.com');
  });

  it('wires an error message via aria-describedby and marks aria-invalid', () => {
    render(<Input label="Email" errorMessage="Email is required" />);
    const input = screen.getByLabelText('Email');
    const error = screen.getByRole('alert');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.getAttribute('aria-describedby')).toContain(error.id);
  });

  it('forwards a ref to the underlying input element', () => {
    const ref = vi.fn();
    render(<Input label="Email" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });
});
