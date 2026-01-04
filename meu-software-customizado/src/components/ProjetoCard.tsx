import React from 'react';
import type { Projeto } from '../types/Projeto';
import { Button } from './Button';
import styles from './ProjetoCard.module.css';

interface ProjetoCardProps {
  projeto: Projeto;
  onClick: (id: number) => void;
  onEdit: (projeto: Projeto) => void;
  onDelete: (id: number) => void;
}

export const ProjetoCard: React.FC<ProjetoCardProps> = ({ projeto, onClick, onDelete, onEdit }) => {
  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    // timeZone: 'UTC' evita que a data recue um dia dependendo do fuso horário do navegador
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(data);
  };

  const getStatusClass = (status: Projeto['status']) => styles[`status${status.charAt(0).toUpperCase() + status.slice(1).replace('_', '')}`] || '';
  const getPrioridadeClass = (prioridade: Projeto['prioridade']) => styles[`priority${prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}`] || '';

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{projeto.nome}</h3>
      <p className={styles.description}>{projeto.descricao}</p>
      <p className={styles.deliveryDate}>📅 Entrega: {formatarData(projeto.dataEntrega)}</p>

      <div className={styles.footer}>
        <div className={styles.tags}>
          <span className={`${styles.status} ${getStatusClass(projeto.status)}`}>
            {projeto.status.replace('_', ' ')}
          </span>
          <span className={`${styles.priority} ${getPrioridadeClass(projeto.prioridade)}`}>
            {projeto.prioridade}
          </span>
        </div>

        <div className={styles.actions}>
          <Button label="Detalhes" onClick={() => onClick(projeto.id)} variant="secondary" className={styles.small} />
          <Button label="Editar" onClick={() => onEdit(projeto)} variant="secondary" className={styles.small} />
          <Button label="Excluir" onClick={() => onDelete(projeto.id)} variant="danger" className={styles.small} />
        </div>
      </div>
    </div>
  );
};
