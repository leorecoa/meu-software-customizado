import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePagination } from './usePagination';

// Dados de exemplo: array de números de 1 a 10
const mockData = Array.from({ length: 10 }, (_, i) => i + 1);
const ITEMS_PER_PAGE = 3;

describe('usePagination Hook', () => {
    it('deve iniciar na página 1 com os cálculos corretos', () => {
        const { result } = renderHook(() => usePagination(mockData, ITEMS_PER_PAGE));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(4); // Math.ceil(10 / 3) = 4
        expect(result.current.currentItems).toEqual([1, 2, 3]);
    });

    it('deve navegar para a próxima página', () => {
        const { result } = renderHook(() => usePagination(mockData, ITEMS_PER_PAGE));

        act(() => {
            result.current.nextPage();
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.currentItems).toEqual([4, 5, 6]);
    });

    it('deve navegar para a página anterior', () => {
        const { result } = renderHook(() => usePagination(mockData, ITEMS_PER_PAGE));

        // Avança para a página 2 primeiro
        act(() => {
            result.current.goToPage(2);
        });

        act(() => {
            result.current.prevPage();
        });

        expect(result.current.currentPage).toBe(1);
        expect(result.current.currentItems).toEqual([1, 2, 3]);
    });

    it('não deve ultrapassar o limite máximo de páginas', () => {
        const { result } = renderHook(() => usePagination(mockData, ITEMS_PER_PAGE));

        // Tenta ir além da última página (4)
        act(() => {
            result.current.goToPage(4);
            result.current.nextPage();
        });

        expect(result.current.currentPage).toBe(4);
    });

    it('não deve ir para página menor que 1', () => {
        const { result } = renderHook(() => usePagination(mockData, ITEMS_PER_PAGE));

        act(() => {
            result.current.prevPage();
        });

        expect(result.current.currentPage).toBe(1);
    });

    it('deve ir para uma página específica', () => {
        const { result } = renderHook(() => usePagination(mockData, ITEMS_PER_PAGE));

        act(() => {
            result.current.goToPage(3);
        });

        expect(result.current.currentPage).toBe(3);
        expect(result.current.currentItems).toEqual([7, 8, 9]);
    });

    it('deve ajustar a página se goToPage receber valor fora dos limites', () => {
        const { result } = renderHook(() => usePagination(mockData, ITEMS_PER_PAGE));

        act(() => {
            result.current.goToPage(999); // Acima do máximo
        });
        expect(result.current.currentPage).toBe(4);

        act(() => {
            result.current.goToPage(-10); // Abaixo do mínimo
        });
        expect(result.current.currentPage).toBe(1);
    });
});