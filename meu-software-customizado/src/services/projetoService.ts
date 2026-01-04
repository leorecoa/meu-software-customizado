import type { Projeto } from '../types/Projeto';

const STORAGE_KEY = 'projetos';

/**
 * Serviço para gerenciar projetos
 * Abstrai a lógica de persistência (localStorage)
 * Pode ser facilmente adaptado para consumir uma API REST
 */
export const projetoService = {
  /**
   * Retorna todos os projetos
   */
  getAll(): Projeto[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as Projeto[];
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return [];
    }
  },

  /**
   * Busca um projeto por ID
   */
  getById(id: string): Projeto | null {
    const projetos = this.getAll();
    return projetos.find(p => p.id === id) || null;
  },

  /**
   * Cria um novo projeto
   */
  create(dadosProjeto: Omit<Projeto, 'id'>): Projeto {
    const projetos = this.getAll();
    const novoProjeto: Projeto = {
      ...dadosProjeto,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    projetos.push(novoProjeto);
    this.saveAll(projetos);
    return novoProjeto;
  },

  /**
   * Atualiza um projeto existente
   */
  update(id: string, dadosAtualizados: Omit<Projeto, 'id'>): Projeto {
    const projetos = this.getAll();
    const index = projetos.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error(`Projeto com ID ${id} não encontrado`);
    }

    const projetoAtualizado: Projeto = {
      ...dadosAtualizados,
      id,
    };
    
    projetos[index] = projetoAtualizado;
    this.saveAll(projetos);
    return projetoAtualizado;
  },

  /**
   * Exclui um projeto
   */
  delete(id: string): void {
    const projetos = this.getAll();
    const projetosFiltrados = projetos.filter(p => p.id !== id);
    
    if (projetos.length === projetosFiltrados.length) {
      throw new Error(`Projeto com ID ${id} não encontrado`);
    }
    
    this.saveAll(projetosFiltrados);
  },

  /**
   * Exclui múltiplos projetos
   */
  deleteMany(ids: string[]): void {
    const projetos = this.getAll();
    const projetosFiltrados = projetos.filter(p => !ids.includes(p.id));
    this.saveAll(projetosFiltrados);
  },

  /**
   * Salva todos os projetos no localStorage
   */
  saveAll(projetos: Projeto[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projetos));
    } catch (error) {
      console.error('Erro ao salvar projetos:', error);
      throw error;
    }
  },
};

