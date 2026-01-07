import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import RevisaoHooks from "./revisaohooks";
import styles from './App.module.css';
import { ThemeToggle } from "./components/ThemeToggle";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}>
          Projetos
        </NavLink>
        <NavLink to="/hooks/1" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`} style={{ opacity: 0.7, fontSize: '0.9em' }}>
          🧪 Lab (Hooks)
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/hooks/:id" element={<RevisaoHooks />} />
      </Route>
    </Routes>
  );
}