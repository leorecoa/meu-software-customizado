import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProjetoForm } from './components/ProjetoForm';
import { Button } from './components/Button';
import { ConfirmationModal } from './components/ConfirmationModal';
import { useSelection } from './hooks/useSelection';
import { usePagination } from './hooks/usePagination';
import { PaginationControls } from './components/PaginationControls';
import { Toolbar } from './components/Toolbar';
import type { Projeto } from './types/Projeto';

// Componente auxiliar para a rota de Edição
const EditProjectWrapper = ({ projects, onUpdate }: { projects: Projeto[], onUpdate: (id: string, data: Omit<Projeto, 'id'>) => Promise<void> }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Projeto não encontrado</h2>
        <Link to="/" style={{ color: '#007bff' }}>Voltar para o início</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <ProjetoForm
        initialData={project}
        onSave={async (data) => await onUpdate(project.id, data)}
        onCancel={() => navigate('/')}
      />
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState<Projeto[]>(() => {
    const saved = localStorage.getItem('projetos');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Projeto['status'] | 'todos'>('todos');
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    localStorage.setItem('projetos', JSON.stringify(projetos));
  }, [projetos]);

  const filteredProjects = projetos.filter(p => {
    const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems: currentProjects,
    nextPage,
    prevPage
  } = usePagination(filteredProjects, ITEMS_PER_PAGE);

  const {
    selectedIds: selectedProjects,
    isAllSelected,
    toggleSelection: toggleProjectSelection,
    toggleSelectAll,
    clearSelection
  } = useSelection(filteredProjects, (p) => p.id);

  const handleSave = async (dadosProjeto: Omit<Projeto, 'id'>) => {
    // Simula um delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    const novoProjeto: Projeto = {
      ...dadosProjeto,
      id: Date.now().toString() // Gera um ID simples baseado no tempo
    };

    setProjetos((prev) => [...prev, novoProjeto]);
    toast.success('Projeto salvo com sucesso!');
    navigate('/');
  };

  const handleUpdate = async (id: string, dadosAtualizados: Omit<Projeto, 'id'>) => {
    // Simula um delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    setProjetos((prev) => prev.map(p => p.id === id ? { ...dadosAtualizados, id } : p));
    toast.success('Projeto atualizado com sucesso!');
    navigate('/');
  };

  const handleDelete = (id: string) => {
    setProjectToDelete(id);
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      setProjetos((prev) => prev.filter((p) => !selectedProjects.includes(p.id)));
      toast.success(`${selectedProjects.length} projetos excluídos com sucesso!`);
      clearSelection();
      setIsBulkDelete(false);
    } else if (projectToDelete) {
      setProjetos((prev) => prev.filter((p) => p.id !== projectToDelete));
      toast.success('Projeto excluído com sucesso!');
      setProjectToDelete(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', color: 'var(--text-primary, inherit)' }}>
      <Routes>
        {/* Rota Inicial (Dashboard) */}
        <Route path="/" element={
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h1>Meus Projetos</h1>
                <Link to="/novo" style={{
                  backgroundColor: '#0066cc', color: 'white', padding: '10px 20px',
                  borderRadius: '6px', textDecoration: 'none', fontWeight: '500'
                }}>
                  + Novo Projeto
                </Link>
              </div>
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
            </div>

            {filteredProjects.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', marginTop: '50px', padding: '2rem', border: '2px dashed #ccc', borderRadius: '8px' }}>
                <p>{(searchTerm || statusFilter !== 'todos') ? 'Nenhum projeto encontrado para os filtros selecionados.' : 'Nenhum projeto cadastrado ainda.'}</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {currentProjects.map(projeto => (
                    <div key={projeto.id} style={{
                      padding: '1.5rem', border: '1px solid var(--border-primary, #ddd)',
                      borderRadius: '8px', backgroundColor: 'var(--bg-card, #fff)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <input
                            type="checkbox"
                            checked={selectedProjects.includes(projeto.id)}
                            onChange={() => toggleProjectSelection(projeto.id)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                          />
                          <h3 style={{ margin: '0' }}>{projeto.nome}</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Button
                            label="Editar"
                            variant="secondary"
                            onClick={() => navigate(`/editar/${projeto.id}`)}
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                          />
                          <Button
                            label="Excluir"
                            variant="danger"
                            onClick={() => handleDelete(projeto.id)}
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>
                      <p style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>{projeto.descricao}</p>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                        <span>📅 {new Date(projeto.dataEntrega).toLocaleDateString()}</span>
                        <span style={{ textTransform: 'capitalize' }}>📌 {projeto.status.replace('_', ' ')}</span>
                        <span style={{ textTransform: 'capitalize' }}>⚡ {projeto.prioridade}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onNext={nextPage}
                  onPrev={prevPage}
                />
              </>
            )}
          </div>
        } />

        {/* Rota de Criação */}
        <Route path="/novo" element={
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ProjetoForm
              onSave={handleSave}
              onCancel={() => navigate('/')}
            />
          </div>
        } />

        {/* Rota de Edição */}
        <Route path="/editar/:id" element={<EditProjectWrapper projects={projetos} onUpdate={handleUpdate} />} />

        {/* Rota de Fallback (404) */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#dc3545' }}>
            <h1>Erro 404</h1>
            <p>Página não encontrada.</p>
            <Link to="/" style={{ color: '#007bff' }}>Voltar para o início</Link>
          </div>
        } />
      </Routes>

      <ConfirmationModal
        isOpen={!!projectToDelete || isBulkDelete}
        onClose={() => { setProjectToDelete(null); setIsBulkDelete(false); }}
        onConfirm={confirmDelete}
        title={isBulkDelete ? "Excluir Projetos" : "Excluir Projeto"}
        message={isBulkDelete ? `Tem certeza que deseja excluir ${selectedProjects.length} projetos selecionados?` : "Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita."}
        confirmLabel="Excluir"
        variant="danger"
      />
    </div>
  );
};

export default App;