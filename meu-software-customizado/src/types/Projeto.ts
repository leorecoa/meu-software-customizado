// Aqui definimos o contrato de dados
export interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  status: 'em_andamento' | 'concluido' | 'pendente';
  prioridade: 'alta' | 'media' | 'baixa';
  dataEntrega: string;
}
