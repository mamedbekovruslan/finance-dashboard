import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Shown below the field and wired via aria-describedby + aria-invalid. */
  errorMessage?: string;
  /** Optional supporting copy shown below the field when there's no error. */
  hint?: string;
}

/**
 * forwardRef so React Hook Form's `register()` can attach its ref
 * directly (Phase 3/4 forms) without wrapping.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, hint, id, className, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = errorMessage ? `${inputId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={styles.field}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={[styles.input, errorMessage ? styles.inputError : '', className].filter(Boolean).join(' ')}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {hint && !errorMessage ? (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        ) : null}
        {errorMessage ? (
          <p id={errorId} className={styles.error} role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
