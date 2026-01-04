import { useState } from 'react';

export function useSelection<T>(items: T[], getItemId: (item: T) => string) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const isAllSelected = items.length > 0 && items.every((item) => selectedIds.includes(getItemId(item)));

    const toggleSelection = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        const currentIds = items.map(getItemId);
        if (isAllSelected) {
            setSelectedIds((prev) => prev.filter((id) => !currentIds.includes(id)));
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...currentIds])));
        }
    };

    const clearSelection = () => setSelectedIds([]);

    return {
        selectedIds,
        isAllSelected,
        toggleSelection,
        toggleSelectAll,
        clearSelection,
    };
}