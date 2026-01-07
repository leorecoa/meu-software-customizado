
import styles from '../App.module.css';

export default function Projects() {
    // Mock de dados para visualização
    const projects = [
        { id: 1, name: 'Website Institucional', status: 'Em andamento', client: 'Acme Corp' },
        { id: 2, name: 'App Mobile Delivery', status: 'Planejamento', client: 'FastFood' },
        { id: 3, name: 'Dashboard Financeiro', status: 'Concluído', client: 'BankInc' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <header className={styles.cardHeader}>
                    <div>
                        <h1 className={styles.cardTitle}>📁 Projetos</h1>
                        <p className={styles.cardSubtitle}>Gerencie suas demandas</p>
                    </div>
                    <button className={`${styles.button} ${styles.buttonPrimary}`}>+ Novo Projeto</button>
                </header>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '10px' }}>Nome</th>
                            <th style={{ padding: '10px' }}>Cliente</th>
                            <th style={{ padding: '10px' }}>Status</th>
                            <th style={{ padding: '10px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '16px 10px', fontWeight: 500, color: 'var(--text-main)' }}>{project.name}</td>
                                <td style={{ padding: '16px 10px', color: 'var(--text-muted)' }}>{project.client}</td>
                                <td style={{ padding: '16px 10px' }}><span className={`${styles.badge} ${styles.badgeSuccess}`}>{project.status}</span></td>
                                <td style={{ padding: '15px 10px' }}><button className={styles.button}>Editar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}