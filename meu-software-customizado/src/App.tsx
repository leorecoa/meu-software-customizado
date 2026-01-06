import { Routes, Route, Link } from "react-router-dom";
import RevisaoHooks from "./revisaohooks";

function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Página Inicial</h1>
      <p>Bem-vindo ao meu software customizado!</p>
      <nav>
        <Link
          to="/hooks/1"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Ir para Revisão de Hooks (ID: 1)
        </Link>
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
