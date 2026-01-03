import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ProjetoDetalhes } from './pages/ProjetoDetalhes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projetos/:id" element={<ProjetoDetalhes />} />
    </Routes>
  );
}

export default App;