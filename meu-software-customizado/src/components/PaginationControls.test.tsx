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
        expect(screen.getByLabelText('Página anterior')).toBeTruthy();
        expect(screen.getByLabelText('Próxima página')).toBeTruthy();
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

        const prevButton = screen.getByLabelText('Página anterior') as HTMLButtonElement;
        const nextButton = screen.getByLabelText('Próxima página') as HTMLButtonElement;

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

        const prevButton = screen.getByLabelText('Página anterior') as HTMLButtonElement;
        const nextButton = screen.getByLabelText('Próxima página') as HTMLButtonElement;

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

        fireEvent.click(screen.getByLabelText('Página anterior'));
        expect(onPrevMock).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByLabelText('Próxima página'));
        expect(onNextMock).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onPageChange ao clicar em um número de página', () => {
        const onPageChangeMock = vi.fn();

        render(
            <PaginationControls
                currentPage={2}
                totalPages={5}
                onNext={vi.fn()}
                onPrev={vi.fn()}
                onPageChange={onPageChangeMock}
            />
        );

        const page3Button = screen.getByLabelText('Ir para página 3');
        fireEvent.click(page3Button);

        expect(onPageChangeMock).toHaveBeenCalledWith(3);
    });

    it('deve mostrar informações de totalItems quando fornecidas', () => {
        render(
            <PaginationControls
                currentPage={1}
                totalPages={5}
                onNext={vi.fn()}
                onPrev={vi.fn()}
                totalItems={50}
                itemsPerPage={10}
            />
        );

        expect(screen.getByText(/Mostrando 1 - 10 de 50 projeto/i)).toBeTruthy();
    });
});
