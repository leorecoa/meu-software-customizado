import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Dashboard } from './pages/Dashboard';
import { ProjetoForm } from './components/ProjetoForm';
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
    try {
      const saved = localStorage.getItem('projetos');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Erro ao carregar projetos do localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('projetos', JSON.stringify(projetos));
  }, [projetos]);

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
    setProjetos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', color: 'var(--text-primary, inherit)' }}>
        <Routes>
          {/* Rota Inicial (Dashboard) */}
          <Route path="/" element={
            <Dashboard
              projetos={projetos}
              onDelete={handleDelete}
              onBulkDelete={(ids) => {
                setProjetos((prev) => prev.filter((p) => !ids.includes(p.id)));
              }}
            />
          } />

          {/* Rota de Criação */}
          <Route path="/novo" element={
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
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
            <div style={{ textAlign: 'center', marginTop: '50px', padding: '2rem' }}>
              <h1 style={{ color: '#dc3545' }}>Erro 404</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Página não encontrada.</p>
              <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '500' }}>Voltar para o início</Link>
            </div>
          } />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;