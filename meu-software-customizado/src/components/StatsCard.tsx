import React from 'react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  subtitle?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  subtitle,
}) => {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <h2 className={styles.value}>{value}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {icon && (
          <div className={styles.icon}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

