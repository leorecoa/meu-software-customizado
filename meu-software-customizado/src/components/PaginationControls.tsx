import React from 'react';
import { Button } from './Button';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    onNext,
    onPrev
}) => {
    // Não renderiza nada se houver apenas uma página ou nenhuma
    if (totalPages <= 1) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <Button
                label="Anterior"
                onClick={onPrev}
                disabled={currentPage === 1}
                variant="secondary"
            />
            <span>
                Página {currentPage} de {totalPages}
            </span>
            <Button
                label="Próxima"
                onClick={onNext}
                disabled={currentPage === totalPages}
                variant="secondary"
            />
        </div>
    );
};