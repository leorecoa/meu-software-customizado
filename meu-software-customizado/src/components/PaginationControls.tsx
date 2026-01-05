import React from 'react';
import styles from './PaginationControls.module.css';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
    onPageChange?: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    onNext,
    onPrev,
    onPageChange,
    totalItems,
    itemsPerPage,
}) => {
    // Não renderiza nada se houver apenas uma página ou nenhuma
    if (totalPages <= 1) return null;

    // Calcula quais números de página mostrar
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5; // Máximo de páginas visíveis

        if (totalPages <= maxVisible) {
            // Mostra todas as páginas se forem poucas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Lógica para mostrar páginas com ellipsis
            if (currentPage <= 3) {
                // Primeiras páginas
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Últimas páginas
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Páginas do meio
                pages.push(1);
                pages.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    const handlePageClick = (page: number) => {
        if (onPageChange) {
            onPageChange(page);
        }
    };

    const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
    const endItem = totalItems && itemsPerPage
        ? Math.min(currentPage * itemsPerPage, totalItems)
        : null;

    return (
        <div className={styles.pagination}>
            {/* Informações da paginação */}
            {totalItems && (
                <div className={styles.info}>
                    <span className={styles.infoText}>
                        Mostrando {startItem} - {endItem} de {totalItems} projeto{totalItems !== 1 ? 's' : ''}
                    </span>
                </div>
            )}

            {/* Controles de navegação */}
            <div className={styles.controls}>
                <button
                    className={`${styles.navButton} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={onPrev}
                    disabled={currentPage === 1}
                    aria-label="Página anterior"
                    title="Página anterior"
                >
                    <span className={styles.icon}>←</span>
                    <span className={styles.buttonText}>Anterior</span>
                </button>

                <div className={styles.pageNumbers}>
                    {pageNumbers.map((page, index) => {
                        if (page === 'ellipsis') {
                            return (
                                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                                    ...
                                </span>
                            );
                        }

                        const pageNum = page as number;
                        const isActive = pageNum === currentPage;

                        return (
                            <button
                                key={pageNum}
                                className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
                                onClick={() => handlePageClick(pageNum)}
                                aria-label={`Ir para página ${pageNum}`}
                                aria-current={isActive ? 'page' : undefined}
                                disabled={!onPageChange && pageNum !== currentPage}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                <button
                    className={`${styles.navButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                    aria-label="Próxima página"
                    title="Próxima página"
                >
                    <span className={styles.buttonText}>Próxima</span>
                    <span className={styles.icon}>→</span>
                </button>
            </div>

            {/* Indicador de página atual */}
            <div className={styles.pageIndicator}>
                <span className={styles.pageText}>
                    Página {currentPage} de {totalPages}
                </span>
            </div>
        </div>
    );
};
