import React from 'react';
import type { Projeto } from '../types/Projeto';
import styles from './ProjetoCard.module.css';

interface ProjetoCardProps {
  projeto: Projeto;
  onClick: (id: number) => void;
  onEdit: (projeto: Projeto) => void;
  onDelete: (id: number) => void;
}

export const ProjetoCard: React.FC<ProjetoCardProps> = ({ projeto, onClick, onDelete, onEdit }) => {
  // Lógica visual simples para mudar a cor baseada no status
  const statusColorMap = {
    em_andamento: 'blue',
    concluido: 'green',
    pendente: 'orange'
  };

  const prioridadeColorMap = {
    alta: '#dc3545', // Vermelho
    media: '#ffc107', // Amarelo/Laranja
    baixa: '#28a745' // Verde
  };

  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    // timeZone: 'UTC' evita que a data recue um dia dependendo do fuso horário do navegador
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(data);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{projeto.nome}</h3>
      <p className={styles.description}>{projeto.descricao}</p>
      <p className={styles.deliveryDate}>📅 Entrega: {formatarData(projeto.dataEntrega)}</p>

      <div className={styles.footer}>
        <div className={styles.tags}>
          <span className={styles.status} style={{ color: statusColorMap[projeto.status] }}>
            {projeto.status.toUpperCase()}
          </span>
          <span className={styles.priority} style={{ backgroundColor: prioridadeColorMap[projeto.prioridade] }}>
            {projeto.prioridade.toUpperCase()}
          </span>
        </div>

        <div className={styles.actions}>
          <button onClick={() => onClick(projeto.id)} style={{ textDecoration: 'underline', color: 'var(--border-focus)' }}>
            Ver Detalhes
          </button>
          <button onClick={() => onEdit(projeto)} style={{ color: '#e0a800' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Editar
          </button>
          <button onClick={() => onDelete(projeto.id)} style={{ color: 'var(--button-danger-bg)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
