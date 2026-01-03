import { Button } from '../components/Button';

export const Home = () => {
  const handleClick = () => {
    alert('Sistema iniciado com sucesso!');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Bem-vindo ao Seu Software Customizado</h1>
      <p>A estrutura base está pronta para escalar.</p>
      
      <div style={{ marginTop: '1rem' }}>
        <Button label="Iniciar Ação" onClick={handleClick} />
      </div>
    </div>
  );
};
