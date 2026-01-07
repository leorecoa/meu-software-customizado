import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    />
  );
}
