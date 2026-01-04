import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PaginationControls } from './PaginationControls';

describe('PaginationControls', () => {
    it('não deve renderizar nada se totalPages for 1 ou menos', () => {
        const { container } = render(
            <PaginationControls
                currentPage={1}
                totalPages={1}
                onNext={vi.fn()}
                onPrev={vi.fn()}
            />
        );
        expect(container.innerHTML).toBe('');

        const { container: container0 } = render(
            <PaginationControls
                currentPage={1}
                totalPages={0}
                onNext={vi.fn()}
                onPrev={vi.fn()}
            />
        );
        expect(container0.innerHTML).toBe('');
    });

    it('deve renderizar corretamente quando houver mais de uma página', () => {
        render(
            <PaginationControls
                currentPage={1}
                totalPages={5}
                onNext={vi.fn()}
                onPrev={vi.fn()}
            />
        );

        expect(screen.getByText('Página 1 de 5')).toBeTruthy();
        expect(screen.getByText('Anterior')).toBeTruthy();
        expect(screen.getByText('Próxima')).toBeTruthy();
    });

    it('deve desabilitar o botão Anterior na primeira página', () => {
        render(
            <PaginationControls
                currentPage={1}
                totalPages={5}
                onNext={vi.fn()}
                onPrev={vi.fn()}
            />
        );

        const prevButton = screen.getByText('Anterior') as HTMLButtonElement;
        const nextButton = screen.getByText('Próxima') as HTMLButtonElement;

        expect(prevButton.disabled).toBe(true);
        expect(nextButton.disabled).toBe(false);
    });

    it('deve desabilitar o botão Próxima na última página', () => {
        render(
            <PaginationControls
                currentPage={5}
                totalPages={5}
                onNext={vi.fn()}
                onPrev={vi.fn()}
            />
        );

        const prevButton = screen.getByText('Anterior') as HTMLButtonElement;
        const nextButton = screen.getByText('Próxima') as HTMLButtonElement;

        expect(prevButton.disabled).toBe(false);
        expect(nextButton.disabled).toBe(true);
    });

    it('deve chamar onNext e onPrev ao clicar nos botões', () => {
        const onNextMock = vi.fn();
        const onPrevMock = vi.fn();

        render(
            <PaginationControls
                currentPage={2}
                totalPages={5}
                onNext={onNextMock}
                onPrev={onPrevMock}
            />
        );

        fireEvent.click(screen.getByText('Anterior'));
        expect(onPrevMock).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByText('Próxima'));
        expect(onNextMock).toHaveBeenCalledTimes(1);
    });
});