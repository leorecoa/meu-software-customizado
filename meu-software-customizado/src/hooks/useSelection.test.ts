import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useSelection } from './useSelection';

interface Item {
    id: string;
    name: string;
}

const mockItems: Item[] = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
];

const getItemId = (item: Item) => item.id;

describe('useSelection Hook', () => {
    it('deve iniciar com a seleção vazia', () => {
        const { result } = renderHook(() => useSelection(mockItems, getItemId));

        expect(result.current.selectedIds).toEqual([]);
        expect(result.current.isAllSelected).toBe(false);
    });

    it('deve alternar a seleção de um item individualmente', () => {
        const { result } = renderHook(() => useSelection(mockItems, getItemId));

        // Selecionar o item '1'
        act(() => {
            result.current.toggleSelection('1');
        });

        expect(result.current.selectedIds).toContain('1');
        expect(result.current.selectedIds).toHaveLength(1);

        // Deselecionar o item '1'
        act(() => {
            result.current.toggleSelection('1');
        });

        expect(result.current.selectedIds).not.toContain('1');
        expect(result.current.selectedIds).toHaveLength(0);
    });

    it('deve selecionar todos os itens quando toggleSelectAll é chamado e nem todos estão selecionados', () => {
        const { result } = renderHook(() => useSelection(mockItems, getItemId));

        act(() => {
            result.current.toggleSelectAll();
        });

        expect(result.current.selectedIds).toHaveLength(3);
        expect(result.current.isAllSelected).toBe(true);
        expect(result.current.selectedIds).toEqual(expect.arrayContaining(['1', '2', '3']));
    });

    it('deve deselecionar todos os itens quando toggleSelectAll é chamado e todos já estão selecionados', () => {
        const { result } = renderHook(() => useSelection(mockItems, getItemId));

        // Primeiro seleciona todos
        act(() => {
            result.current.toggleSelectAll();
        });

        // Depois alterna novamente para deselecionar
        act(() => {
            result.current.toggleSelectAll();
        });

        expect(result.current.selectedIds).toHaveLength(0);
        expect(result.current.isAllSelected).toBe(false);
    });

    it('deve limpar a seleção corretamente', () => {
        const { result } = renderHook(() => useSelection(mockItems, getItemId));

        // Seleciona alguns itens
        act(() => {
            result.current.toggleSelection('1');
            result.current.toggleSelection('2');
        });

        expect(result.current.selectedIds).toHaveLength(2);

        // Limpa
        act(() => {
            result.current.clearSelection();
        });

        expect(result.current.selectedIds).toEqual([]);
    });
});