import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toolbar } from './Toolbar';

describe('Toolbar Component', () => {
    it('deve corresponder ao snapshot', () => {
        const { asFragment } = render(
            <Toolbar
                searchTerm=""
                onSearchChange={vi.fn()}
                statusFilter="todos"
                onStatusFilterChange={vi.fn()}
                isAllSelected={false}
                onToggleSelectAll={vi.fn()}
                selectedCount={0}
                onBulkDelete={vi.fn()}
            />
        );

        // Cria um "retrato" do HTML renderizado.
        // Se você mudar o componente no futuro, o teste falhará avisando da mudança.
        expect(asFragment()).toMatchSnapshot();
    });
});