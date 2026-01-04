import React, { useEffect, useId } from 'react';
import { Button } from './Button';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'primary' | 'danger';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    variant = 'primary'
}) => {
    const titleId = useId();

    // Fecha o modal ao pressionar a tecla ESC
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <button
                type="button"
                className={styles.backdrop}
                onClick={onClose}
                tabIndex={-1}
                aria-label="Fechar modal"
            />
            <dialog className={styles.modal} open aria-labelledby={titleId}>
                <h3 id={titleId} className={styles.title}>{title}</h3>
                <p className={styles.message}>{message}</p>
                <div className={styles.actions}>
                    <Button label={cancelLabel} variant="secondary" onClick={onClose} />
                    <Button label={confirmLabel} variant={variant} onClick={() => {
                        onConfirm();
                        onClose();
                    }} />
                </div>
            </dialog>
        </div>
    );
};