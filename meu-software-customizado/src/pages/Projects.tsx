
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
                <header className={styles.cardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className={styles.cardTitle}>📁 Projetos</h1>
                        <p className={styles.cardSubtitle}>Gerencie suas demandas</p>
                    </div>
                    <button className={`${styles.button} ${styles.buttonPrimary}`}>+ Novo Projeto</button>
                </header>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '10px' }}>Nome</th>
                            <th style={{ padding: '10px' }}>Cliente</th>
                            <th style={{ padding: '10px' }}>Status</th>
                            <th style={{ padding: '10px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '15px 10px', fontWeight: 500 }}>{project.name}</td>
                                <td style={{ padding: '15px 10px', color: '#666' }}>{project.client}</td>
                                <td style={{ padding: '15px 10px' }}><span className={styles.badge}>{project.status}</span></td>
                                <td style={{ padding: '15px 10px' }}><button className={styles.button}>Editar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}