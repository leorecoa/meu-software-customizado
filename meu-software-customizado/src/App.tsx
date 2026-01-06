import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import RevisaoHooks from "./revisaohooks";
import styles from './App.module.css';
import { ThemeToggle } from "./components/ThemeToggle";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}>
          Home
        </NavLink>
        <NavLink to="/hooks/1" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}>
          Hooks
        </NavLink>
      </div>
      <ThemeToggle />
    </nav>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <main className={styles.pageContent}>
        <Outlet />
      </main>
    </>
  );
}

function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Página Inicial</h1>
      <p className={styles.homeText}>Bem-vindo ao meu software customizado!</p>
      <nav>
        <NavLink to="/hooks/1" className={styles.homeLink}>Ir para Revisão de Hooks (ID: 1) →</NavLink>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/hooks/:id" element={<RevisaoHooks />} />
      </Route>
    </Routes>
  );
}