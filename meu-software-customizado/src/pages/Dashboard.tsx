import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { Projeto } from '../types/Projeto';

import { ProjetoCard } from '../components/ProjetoCard';
import { StatsCard } from '../components/StatsCard';
import { StatusChart } from '../components/StatusChart';
import { Toolbar } from '../components/Toolbar';
import { Button } from '../components/Button';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { PaginationControls } from '../components/PaginationControls';

import { useSelection } from '../hooks/useSelection';
import { usePagination } from '../hooks/usePagination';
import { useSort } from '../hooks/useSort';
import { useTheme } from '../contexts/ThemeContext';

import { exportToCSV, exportToJSON } from '../utils/exportUtils';

import styles from './Dashboard.module.css';

interface DashboardProps {
  readonly projetos: Projeto[];
  readonly onDelete: (id: string) => void;
  readonly onBulkDelete: (ids: string[]) => void;
}

const ITEMS_PER_PAGE = 6;

export function Dashboard({
  projetos,
  onDelete,
  onBulkDelete,
}: DashboardProps) {
  const { theme, toggleTheme } = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<Projeto['status'] | 'todos'>('todos');
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [showStats, setShowStats] = useState(true);

  /* ================= FILTER ================= */
  const filteredProjects = useMemo(() => {
    return projetos.filter((p) => {
      const matchesSearch =
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descricao.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'todos' || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projetos, searchTerm, statusFilter]);

  /* ================= SORT ================= */
  const {
    sortedItems,
    sortField,
    sortDirection,
    handleSort,
    clearSort,
  } = useSort(filteredProjects);

  /* ================= PAGINATION ================= */
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    nextPage,
    prevPage,
  } = usePagination(sortedItems, ITEMS_PER_PAGE);

  /* ================= SELECTION ================= */
  const {
    selectedIds,
    isAllSelected,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
  } = useSelection(sortedItems, (p) => p.id);

  /* ================= STATS ================= */
  const stats = useMemo(() => {
    const now = new Date();

    return {
      total: projetos.length,
      pendente: projetos.filter((p) => p.status === 'pendente').length,
      emAndamento: projetos.filter((p) => p.status === 'em_andamento').length,
      concluido: projetos.filter((p) => p.status === 'concluido').length,
      atrasado: projetos.filter(
        (p) => new Date(p.dataEntrega) < now && p.status !== 'concluido'
      ).length,
    };
  }, [projetos]);

  /* ================= ACTIONS ================= */
  function confirmDelete() {
    if (bulkDelete) {
      onBulkDelete(selectedIds);
      clearSelection();
      setBulkDelete(false);
      return;
    }

    if (projectToDelete) {
      onDelete(projectToDelete);
      setProjectToDelete(null);
    }
  }

  function handleExportCSV() {
    exportToCSV(filteredProjects);
    toast.success('Projetos exportados para CSV!');
  }

  function handleExportJSON() {
    exportToJSON(filteredProjects);
    toast.success('Projetos exportados para JSON!');
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>📊 Dashboard de Projetos</h1>
          <p className={styles.subtitle}>
            Gerencie e acompanhe seus projetos
          </p>
        </div>

        <div className={styles.headerActions}>
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>

          <Link to="/novo" className={styles.newProjectButton}>
            + Novo Projeto
          </Link>
        </div>
      </header>

      {/* STATS */}
      {showStats && (
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <StatsCard title="Total" value={stats.total} icon="📁" />
            <StatsCard title="Pendentes" value={stats.pendente} icon="⏳" />
            <StatsCard title="Em Andamento" value={stats.emAndamento} icon="🚀" />
            <StatsCard title="Concluídos" value={stats.concluido} icon="✅" />
            <StatsCard
              title="Atrasados"
              value={stats.atrasado}
              icon="⚠️"
              color="danger"
            />
          </div>

          {projetos.length > 0 && (
            <div className={styles.chartContainer}>
              <StatusChart projetos={projetos} />
            </div>
          )}
        </section>
      )}

      {/* TOOLBAR */}
      <Toolbar
        searchTerm={searchTerm}
        onSearchChange={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusFilterChange={(status) => {
          setStatusFilter(status);
          setCurrentPage(1);
        }}
        isAllSelected={isAllSelected}
        onToggleSelectAll={toggleSelectAll}
        selectedCount={selectedIds.length}
        onBulkDelete={() => setBulkDelete(true)}
      />

      {/* ACTION BAR */}
      <div className={styles.actionBar}>
        <div>
          <Button variant="secondary" onClick={handleExportCSV}>
            📊 CSV
          </Button>
          <Button variant="secondary" onClick={handleExportJSON}>
            📄 JSON
          </Button>
        </div>

        <div>
          <Button variant="ghost" onClick={() => setShowStats((s) => !s)}>
            {showStats ? 'Ocultar Estatísticas' : 'Mostrar Estatísticas'}
          </Button>
        </div>
      </div>

      {/* SORT */}
      <div className={styles.sortBar}>
        {(['nome', 'dataEntrega', 'prioridade', 'status'] as const).map(
          (field) => (
            <button
              key={field}
              onClick={() => handleSort(field)}
              className={styles.sortButton}
            >
              {field}
              {sortField === field &&
                (sortDirection === 'asc' ? ' ↑' : ' ↓')}
            </button>
          )
        )}

        {sortField && (
          <button onClick={clearSort} className={styles.clearSortButton}>
            Limpar
          </button>
        )}
      </div>

      {/* GRID */}
      <div className={styles.projectsGrid}>
        {currentItems.map((projeto) => (
          <ProjetoCard
            key={projeto.id}
            projeto={projeto}
            isSelected={selectedIds.includes(projeto.id)}
            onSelect={toggleSelection}
            onDelete={setProjectToDelete}
          />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={nextPage}
          onPrev={prevPage}
          onPageChange={setCurrentPage}
          totalItems={sortedItems.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}

      {/* MODAL */}
      <ConfirmationModal
        isOpen={bulkDelete || !!projectToDelete}
        onClose={() => {
          setBulkDelete(false);
          setProjectToDelete(null);
        }}
        onConfirm={confirmDelete}
        title={bulkDelete ? 'Excluir Projetos' : 'Excluir Projeto'}
        message={
          bulkDelete
            ? `Deseja excluir ${selectedIds.length} projetos selecionados?`
            : 'Deseja realmente excluir este projeto?'
        }
        confirmLabel="Excluir"
        variant="danger"
      />
    </div>
  );
}
