import { Routes, Route, Link } from "react-router-dom";
import RevisaoHooks from "./revisaohooks";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '60px auto',
    padding: '40px',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f3f4f6',
  },
  title: {
    fontSize: '2.5rem',
    color: '#111827',
    marginBottom: '16px',
    marginTop: 0,
  },
  text: {
    fontSize: '1.1rem',
    color: '#4b5563',
    marginBottom: '32px',
    lineHeight: 1.5,
  },
  link: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
  }
};

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Página Inicial</h1>
      <p style={styles.text}>Bem-vindo ao meu software customizado!</p>
      <nav>
        <Link to="/hooks/1" style={styles.link}>Ir para Revisão de Hooks (ID: 1) →</Link>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hooks/:id" element={<RevisaoHooks />} />
    </Routes>
  );
}