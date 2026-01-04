import React from 'react';
import styles from './Modal.module.css';
import { Button } from './Button';

type ModalVariant = 'default' | 'danger';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ModalVariant;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'default',
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>

        <div className={styles.content}>
          <p>{message}</p>
        </div>

        <div className={styles.footer}>
          <Button
            label={cancelLabel}
            onClick={onCancel}
            variant="secondary"
          />

          <Button
            label={confirmLabel}
            onClick={onConfirm}
            variant={variant === 'danger' ? 'danger' : 'primary'}
          />
        </div>
      </div>
    </div>
  );
};
