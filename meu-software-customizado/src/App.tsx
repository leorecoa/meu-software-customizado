import { Routes, Route, Link } from 'react-router-dom';
import { ProjetoForm } from './components/ProjetoForm';
import type { Projeto } from './types/Projeto';

const App = () => {
  // Mock para a função de salvar (simulação)
  const handleSave = async (projeto: Omit<Projeto, 'id'>) => {
    console.log('Projeto salvo:', projeto);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Projeto salvo com sucesso! (Verifique o console)');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', color: 'var(--text-primary, inherit)' }}>
      <Routes>
        {/* Rota Inicial (Dashboard) */}
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Bem-vindo ao Sistema de Projetos</h1>
            <p>Gerencie seus projetos de forma simples e eficiente.</p>
            <Link to="/novo" style={{ color: '#007bff', textDecoration: 'underline', fontSize: '1.2rem' }}>
              + Criar Novo Projeto
            </Link>
          </div>
        } />

        {/* Rota de Criação */}
        <Route path="/novo" element={
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ProjetoForm
              onSave={handleSave}
              onCancel={() => globalThis.location.href = '/'}
            />
          </div>
        } />

        {/* Rota de Fallback (404) */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#dc3545' }}>
            <h1>Erro 404</h1>
            <p>Página não encontrada.</p>
            <Link to="/" style={{ color: '#007bff' }}>Voltar para o início</Link>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default App;