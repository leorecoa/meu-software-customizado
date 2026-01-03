import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
}

export const Button = ({
  label,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {label}
    </button>
  );
};
