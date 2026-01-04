import type { Projeto } from '../types/Projeto';

/**
 * Exporta projetos para CSV
 */
export const exportToCSV = (projetos: Projeto[], filename = 'projetos') => {
  const headers = ['Nome', 'Descrição', 'Status', 'Prioridade', 'Data de Entrega'];
  const rows = projetos.map(p => [
    p.nome,
    p.descricao,
    p.status.replace('_', ' '),
    p.prioridade,
    new Date(p.dataEntrega).toLocaleDateString('pt-BR'),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Exporta projetos para JSON
 */
export const exportToJSON = (projetos: Projeto[], filename = 'projetos') => {
  const jsonContent = JSON.stringify(projetos, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

