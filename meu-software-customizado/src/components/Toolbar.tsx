import React from 'react';
import { Button } from './Button';
import type { Projeto } from '../types/Projeto';

interface ToolbarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    statusFilter: Projeto['status'] | 'todos';
    onStatusFilterChange: (status: Projeto['status'] | 'todos') => void;
    isAllSelected: boolean;
    onToggleSelectAll: () => void;
    selectedCount: number;
    onBulkDelete: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    isAllSelected,
    onToggleSelectAll,
    selectedCount,
    onBulkDelete
}) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="🔍 Buscar por nome ou descrição..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '0.8rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-primary, #ccc)',
                        fontSize: '1rem',
                        backgroundColor: 'var(--bg-card, #fff)',
                        color: 'var(--text-primary, inherit)',
                        boxSizing: 'border-box'
                    }}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value as Projeto['status'] | 'todos')}
                    style={{
                        padding: '0.8rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-primary, #ccc)',
                        fontSize: '1rem',
                        backgroundColor: 'var(--bg-card, #fff)',
                        color: 'var(--text-primary, inherit)',
                        cursor: 'pointer'
                    }}
                >
                    <option value="todos">Todos</option>
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', backgroundColor: 'var(--bg-card, #fff)', borderRadius: '6px', border: '1px solid var(--border-primary, #ccc)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                        type="checkbox"
                        id="selectAll"
                        checked={isAllSelected}
                        onChange={onToggleSelectAll}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="selectAll" style={{ cursor: 'pointer', userSelect: 'none' }}>Selecionar Todos</label>
                </div>
                {selectedCount > 0 && (
                    <Button
                        label={`Excluir Selecionados (${selectedCount})`}
                        variant="danger"
                        onClick={onBulkDelete}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', marginLeft: 'auto' }}
                    />
                )}
            </div>
        </div>
    );
};