
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
          <div className={styles.statCard}>
            <h3 className={styles.statTitle} style={{ color: 'var(--primary)' }}>Projetos Ativos</h3>
            <p className={styles.statValue}>12</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statTitle} style={{ color: 'var(--success)' }}>Concluídos</h3>
            <p className={styles.statValue}>5</p>
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