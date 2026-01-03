import React from 'react';
import styles from './SkeletonCard.module.css';

export const SkeletonCard: React.FC = () => {
    return (
        <div className={styles.card}>
            <div className={`${styles.skeleton} ${styles.title}`}></div>
            <div className={`${styles.skeleton} ${styles.text}`}></div>
            <div className={styles.footer}>
                <div className={`${styles.skeleton} ${styles.badge}`}></div>
                <div className={`${styles.skeleton} ${styles.actions}`}></div>
            </div>
        </div>
    );
};