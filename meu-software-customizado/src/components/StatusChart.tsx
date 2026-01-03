import React from 'react';
import type { Projeto } from '../types/Projeto';
import styles from './StatusChart.module.css';

interface StatusChartProps {
    projetos: Projeto[];
}

export const StatusChart: React.FC<StatusChartProps> = ({ projetos }) => {
    // Calcula a quantidade de projetos por status
    const counts = {
        pendente: projetos.filter(p => p.status === 'pendente').length,
        em_andamento: projetos.filter(p => p.status === 'em_andamento').length,
        concluido: projetos.filter(p => p.status === 'concluido').length,
    };

    const total = projetos.length;

    // Função auxiliar para calcular a largura da barra em %
    // Usamos Math.max(..., 1) para evitar divisão por zero se a lista estiver vazia
    const getMax = () => Math.max(counts.pendente, counts.em_andamento, counts.concluido, 1);

    const getWidth = (count: number) => {
        if (total === 0) return '0%';
        // A barra enche baseada no maior valor encontrado, para ficar visualmente proporcional
        return `${(count / getMax()) * 100}%`;
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Métricas de Projetos</h3>

            <div className={styles.chartRow}>
                <span className={styles.label}>Pendente ({counts.pendente})</span>
                <div className={styles.barContainer}>
                    <div className={`${styles.bar} ${styles.pendente}`} style={{ width: getWidth(counts.pendente) }}></div>
                </div>
            </div>

            <div className={styles.chartRow}>
                <span className={styles.label}>Em Andamento ({counts.em_andamento})</span>
                <div className={styles.barContainer}>
                    <div className={`${styles.bar} ${styles.em_andamento}`} style={{ width: getWidth(counts.em_andamento) }}></div>
                </div>
            </div>

            <div className={styles.chartRow}>
                <span className={styles.label}>Concluído ({counts.concluido})</span>
                <div className={styles.barContainer}>
                    <div className={`${styles.bar} ${styles.concluido}`} style={{ width: getWidth(counts.concluido) }}></div>
                </div>
            </div>
        </div>
    );
};