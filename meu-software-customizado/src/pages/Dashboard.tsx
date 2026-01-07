
import { Link } from 'react-router-dom';
import styles from '../App.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>📊 Dashboard</h1>
          <p className={styles.cardSubtitle}>Visão geral dos seus projetos</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ margin: 0, color: '#0284c7' }}>Projetos Ativos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>12</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <h3 style={{ margin: 0, color: '#16a34a' }}>Concluídos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>5</p>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <Link to="/projects" className={`${styles.button} ${styles.buttonPrimary}`}>
            Ver Todos os Projetos →
          </Link>
        </div>
      </div>
    </div>
  );
}