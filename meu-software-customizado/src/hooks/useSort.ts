import { useState, useMemo } from 'react';
import type { Projeto } from '../types/Projeto';

type SortField = 'nome' | 'dataEntrega' | 'prioridade' | 'status';
type SortDirection = 'asc' | 'desc';

interface UseSortReturn {
  sortedItems: Projeto[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  handleSort: (field: SortField) => void;
  clearSort: () => void;
}

export const useSort = (items: Projeto[]): UseSortReturn => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedItems = useMemo(() => {
    if (!sortField) return items;

    return [...items].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      // Tratamento especial para dataEntrega
      if (sortField === 'dataEntrega') {
        aValue = new Date(a.dataEntrega).getTime();
        bValue = new Date(b.dataEntrega).getTime();
      }

      // Tratamento especial para prioridade (ordem: alta > media > baixa)
      if (sortField === 'prioridade') {
        const priorityOrder = { alta: 3, media: 2, baixa: 1 };
        aValue = priorityOrder[a.prioridade];
        bValue = priorityOrder[b.prioridade];
      }

      // Tratamento especial para status
      if (sortField === 'status') {
        const statusOrder = { pendente: 1, em_andamento: 2, concluido: 3 };
        aValue = statusOrder[a.status];
        bValue = statusOrder[b.status];
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Se clicar no mesmo campo, inverte a direção
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Se clicar em campo diferente, ordena ascendente
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearSort = () => {
    setSortField(null);
    setSortDirection('asc');
  };

  return {
    sortedItems,
    sortField,
    sortDirection,
    handleSort,
    clearSort,
  };
};

