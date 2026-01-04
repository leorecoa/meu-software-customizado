export interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  status: 'pendente' | 'em_andamento' | 'concluido';
  prioridade: 'baixa' | 'media' | 'alta';
  dataEntrega: string;
}