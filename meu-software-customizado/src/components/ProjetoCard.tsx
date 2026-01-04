import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Projeto } from '../types/Projeto';
import { Button } from './Button';
import styles from './ProjetoCard.module.css';

interface ProjetoCardProps {
  projeto: Projeto;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProjetoCard: React.FC<ProjetoCardProps> = ({
  projeto,
  isSelected,
  onSelect,
  onDelete,
}) => {
  const navigate = useNavigate();

  const getStatusLabel = (status: Projeto['status']) => {
    const labels = {
      pendente: 'Pendente',
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
    };
    return labels[status];
  };

  const getPriorityLabel = (prioridade: Projeto['prioridade']) => {
    const labels = {
      baixa: 'Baixa',
      media: 'Média',
      alta: 'Alta',
    };
    return labels[prioridade];
  };

  const isOverdue = new Date(projeto.dataEntrega) < new Date() && projeto.status !== 'concluido';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(projeto.id)}
            className={styles.checkbox}
            aria-label={`Selecionar projeto ${projeto.nome}`}
          />
          <h3 className={styles.title}>{projeto.nome}</h3>
        </div>
        <div className={styles.actions}>
          <Button
            label="Editar"
            variant="secondary"
            onClick={() => navigate(`/editar/${projeto.id}`)}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          />
          <Button
            label="Excluir"
            variant="danger"
            onClick={() => onDelete(projeto.id)}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      <p className={styles.description}>{projeto.descricao}</p>

      <div className={styles.footer}>
        <div className={styles.tags}>
          <span
            className={`${styles.status} ${
              projeto.status === 'pendente' ? styles.statusPendente :
              projeto.status === 'em_andamento' ? styles.statusEmAndamento :
              styles.statusConcluido
            }`}
          >
            {getStatusLabel(projeto.status)}
          </span>
          <span
            className={`${styles.priority} ${styles[`priority${projeto.prioridade.charAt(0).toUpperCase() + projeto.prioridade.slice(1)}`]}`}
          >
            {getPriorityLabel(projeto.prioridade)}
          </span>
          <span className={`${styles.date} ${isOverdue ? styles.overdue : ''}`}>
            📅 {new Date(projeto.dataEntrega).toLocaleDateString('pt-BR')}
            {isOverdue && <span className={styles.overdueBadge}>Atrasado</span>}
          </span>
        </div>
      </div>
    </div>
  );
};

