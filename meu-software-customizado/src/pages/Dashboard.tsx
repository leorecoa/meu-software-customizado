import React, { useState } from 'react';
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
import { exportToCSV, exportToJSON } from '../utils/exportUtils';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Dashboard.module.css';

interface DashboardProps {
  projetos: Projeto[];
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  projetos,
  onDelete,
  onBulkDelete,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Projeto['status'] | 'todos'>('todos');
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const ITEMS_PER_PAGE = 6;

  // Filtrar projetos
  const filteredProjects = projetos.filter(p => {
    const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Ordenar projetos
  const { sortedItems, sortField, sortDirection, handleSort, clearSort } = useSort(filteredProjects);

  // Paginação
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems: currentProjects,
    nextPage,
    prevPage,
  } = usePagination(sortedItems, ITEMS_PER_PAGE);

  // Seleção
  const {
    selectedIds: selectedProjects,
    isAllSelected,
    toggleSelection: toggleProjectSelection,
    toggleSelectAll,
    clearSelection,
  } = useSelection(sortedItems, (p) => p.id);

  // Estatísticas
  const stats = {
    total: projetos.length,
    pendente: projetos.filter(p => p.status === 'pendente').length,
    emAndamento: projetos.filter(p => p.status === 'em_andamento').length,
    concluido: projetos.filter(p => p.status === 'concluido').length,
    atrasado: projetos.filter(p => 
      new Date(p.dataEntrega) < new Date() && p.status !== 'concluido'
    ).length,
  };

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id);
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      onBulkDelete(selectedProjects);
      clearSelection();
      setIsBulkDelete(false);
    } else if (projectToDelete) {
      onDelete(projectToDelete);
      setProjectToDelete(null);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(filteredProjects);
    toast.success('Projetos exportados para CSV!');
  };

  const handleExportJSON = () => {
    exportToJSON(filteredProjects);
    toast.success('Projetos exportados para JSON!');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>📊 Dashboard de Projetos</h1>
            <p className={styles.subtitle}>Gerencie e acompanhe seus projetos</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              label={theme === 'dark' ? '☀️' : '🌙'}
              variant="secondary"
              onClick={toggleTheme}
              style={{ padding: '0.5rem', minWidth: 'auto' }}
              title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
            />
            <Link to="/novo" className={styles.newProjectButton}>
              + Novo Projeto
            </Link>
          </div>
        </div>
      </header>

      {showStats && (
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <StatsCard
              title="Total de Projetos"
              value={stats.total}
              icon="📁"
              color="primary"
            />
            <StatsCard
              title="Pendentes"
              value={stats.pendente}
              icon="⏳"
              color="warning"
            />
            <StatsCard
              title="Em Andamento"
              value={stats.emAndamento}
              icon="🚀"
              color="info"
            />
            <StatsCard
              title="Concluídos"
              value={stats.concluido}
              icon="✅"
              color="success"
            />
            <StatsCard
              title="Atrasados"
              value={stats.atrasado}
              icon="⚠️"
              color="danger"
              subtitle={stats.atrasado > 0 ? 'Requer atenção' : undefined}
            />
          </div>
          {projetos.length > 0 && (
            <div className={styles.chartContainer}>
              <StatusChart projetos={projetos} />
            </div>
          )}
        </section>
      )}

      <section className={styles.contentSection}>
        <div className={styles.toolbarWrapper}>
          <Toolbar
            searchTerm={searchTerm}
            onSearchChange={(term) => { setSearchTerm(term); setCurrentPage(1); }}
            statusFilter={statusFilter}
            onStatusFilterChange={(status) => { setStatusFilter(status); setCurrentPage(1); }}
            isAllSelected={isAllSelected}
            onToggleSelectAll={toggleSelectAll}
            selectedCount={selectedProjects.length}
            onBulkDelete={() => setIsBulkDelete(true)}
          />

          <div className={styles.actionsRow}>
            <div className={styles.sortControls}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Ordenar por:
              </label>
              <div className={styles.sortButtons}>
                {(['nome', 'dataEntrega', 'prioridade', 'status'] as const).map(field => (
                  <button
                    key={field}
                    onClick={() => handleSort(field)}
                    className={`${styles.sortButton} ${sortField === field ? styles.active : ''}`}
                    title={sortField === field ? (sortDirection === 'asc' ? 'Crescente' : 'Decrescente') : 'Ordenar'}
                  >
                    {field === 'nome' ? 'Nome' : field === 'dataEntrega' ? 'Data' : field === 'prioridade' ? 'Prioridade' : 'Status'}
                    {sortField === field && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                  </button>
                ))}
                {sortField && (
                  <button onClick={clearSort} className={styles.clearSortButton}>
                    Limpar
                  </button>
                )}
              </div>
            </div>

            <div className={styles.exportButtons}>
              <Button
                label="📊 CSV"
                variant="secondary"
                onClick={handleExportCSV}
                disabled={filteredProjects.length === 0}
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              />
              <Button
                label="📄 JSON"
                variant="secondary"
                onClick={handleExportJSON}
                disabled={filteredProjects.length === 0}
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              />
              <button
                onClick={() => setShowStats(!showStats)}
                className={styles.toggleStatsButton}
                title={showStats ? 'Ocultar estatísticas' : 'Mostrar estatísticas'}
              >
                {showStats ? '📉' : '📈'}
              </button>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateContent}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {searchTerm || statusFilter !== 'todos' ? '🔍' : '📁'}
              </div>
              <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
                {searchTerm || statusFilter !== 'todos' 
                  ? 'Nenhum projeto encontrado' 
                  : 'Nenhum projeto cadastrado'}
              </h2>
              <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)' }}>
                {searchTerm || statusFilter !== 'todos'
                  ? 'Tente ajustar os filtros ou termos de busca'
                  : 'Comece criando seu primeiro projeto'}
              </p>
              {(!searchTerm && statusFilter === 'todos') && (
                <Link to="/novo" className={styles.newProjectButton}>
                  + Criar Primeiro Projeto
                </Link>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className={styles.projectsGrid}>
              {currentProjects.map(projeto => (
                <ProjetoCard
                  key={projeto.id}
                  projeto={projeto}
                  isSelected={selectedProjects.includes(projeto.id)}
                  onSelect={toggleProjectSelection}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={nextPage}
                onPrev={prevPage}
              />
            )}
          </>
        )}
      </section>

      <ConfirmationModal
        isOpen={!!projectToDelete || isBulkDelete}
        onClose={() => { setProjectToDelete(null); setIsBulkDelete(false); }}
        onConfirm={confirmDelete}
        title={isBulkDelete ? "Excluir Projetos" : "Excluir Projeto"}
        message={isBulkDelete 
          ? `Tem certeza que deseja excluir ${selectedProjects.length} projeto(s) selecionado(s)? Esta ação não pode ser desfeita.`
          : "Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita."}
        confirmLabel="Excluir"
        variant="danger"
      />
    </div>
  );
};

