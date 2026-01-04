import { describe, it, expect, beforeEach } from 'vitest';
import { projetoService } from './projetoService';
import type { Projeto } from '../types/Projeto';

// Mock do localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('projetoService', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('getAll', () => {
    it('deve retornar array vazio quando não há projetos', () => {
      const projetos = projetoService.getAll();
      expect(projetos).toEqual([]);
    });

    it('deve retornar todos os projetos salvos', () => {
      const projeto: Projeto = {
        id: '1',
        nome: 'Projeto Teste',
        descricao: 'Descrição teste',
        status: 'pendente',
        prioridade: 'media',
        dataEntrega: '2024-12-31',
      };

      localStorageMock.setItem('projetos', JSON.stringify([projeto]));
      const projetos = projetoService.getAll();
      expect(projetos).toHaveLength(1);
      expect(projetos[0]).toEqual(projeto);
    });
  });

  describe('getById', () => {
    it('deve retornar null quando projeto não existe', () => {
      const projeto = projetoService.getById('999');
      expect(projeto).toBeNull();
    });

    it('deve retornar o projeto quando existe', () => {
      const projeto: Projeto = {
        id: '1',
        nome: 'Projeto Teste',
        descricao: 'Descrição teste',
        status: 'pendente',
        prioridade: 'media',
        dataEntrega: '2024-12-31',
      };

      localStorageMock.setItem('projetos', JSON.stringify([projeto]));
      const encontrado = projetoService.getById('1');
      expect(encontrado).toEqual(projeto);
    });
  });

  describe('create', () => {
    it('deve criar um novo projeto com ID gerado', () => {
      const dadosProjeto: Omit<Projeto, 'id'> = {
        nome: 'Novo Projeto',
        descricao: 'Descrição',
        status: 'pendente',
        prioridade: 'alta',
        dataEntrega: '2024-12-31',
      };

      const projetoCriado = projetoService.create(dadosProjeto);
      expect(projetoCriado.nome).toBe(dadosProjeto.nome);
      expect(projetoCriado.id).toBeDefined();
      expect(projetoCriado.id).toBeTruthy();
    });

    it('deve salvar o projeto no localStorage', () => {
      const dadosProjeto: Omit<Projeto, 'id'> = {
        nome: 'Novo Projeto',
        descricao: 'Descrição',
        status: 'pendente',
        prioridade: 'alta',
        dataEntrega: '2024-12-31',
      };

      projetoService.create(dadosProjeto);
      const projetos = projetoService.getAll();
      expect(projetos).toHaveLength(1);
      expect(projetos[0].nome).toBe(dadosProjeto.nome);
    });
  });

  describe('update', () => {
    it('deve atualizar um projeto existente', () => {
      const projeto: Projeto = {
        id: '1',
        nome: 'Projeto Original',
        descricao: 'Descrição original',
        status: 'pendente',
        prioridade: 'media',
        dataEntrega: '2024-12-31',
      };

      localStorageMock.setItem('projetos', JSON.stringify([projeto]));

      const dadosAtualizados: Omit<Projeto, 'id'> = {
        nome: 'Projeto Atualizado',
        descricao: 'Nova descrição',
        status: 'em_andamento',
        prioridade: 'alta',
        dataEntrega: '2024-12-31',
      };

      const projetoAtualizado = projetoService.update('1', dadosAtualizados);
      expect(projetoAtualizado.nome).toBe('Projeto Atualizado');
      expect(projetoAtualizado.id).toBe('1');

      const projetos = projetoService.getAll();
      expect(projetos[0].nome).toBe('Projeto Atualizado');
    });

    it('deve lançar erro quando projeto não existe', () => {
      const dadosAtualizados: Omit<Projeto, 'id'> = {
        nome: 'Projeto',
        descricao: 'Descrição',
        status: 'pendente',
        prioridade: 'media',
        dataEntrega: '2024-12-31',
      };

      expect(() => projetoService.update('999', dadosAtualizados)).toThrow();
    });
  });

  describe('delete', () => {
    it('deve excluir um projeto existente', () => {
      const projeto1: Projeto = {
        id: '1',
        nome: 'Projeto 1',
        descricao: 'Descrição 1',
        status: 'pendente',
        prioridade: 'media',
        dataEntrega: '2024-12-31',
      };

      const projeto2: Projeto = {
        id: '2',
        nome: 'Projeto 2',
        descricao: 'Descrição 2',
        status: 'pendente',
        prioridade: 'media',
        dataEntrega: '2024-12-31',
      };

      localStorageMock.setItem('projetos', JSON.stringify([projeto1, projeto2]));

      projetoService.delete('1');
      const projetos = projetoService.getAll();
      expect(projetos).toHaveLength(1);
      expect(projetos[0].id).toBe('2');
    });

    it('deve lançar erro quando projeto não existe', () => {
      expect(() => projetoService.delete('999')).toThrow();
    });
  });

  describe('deleteMany', () => {
    it('deve excluir múltiplos projetos', () => {
      const projetos: Projeto[] = [
        {
          id: '1',
          nome: 'Projeto 1',
          descricao: 'Descrição 1',
          status: 'pendente',
          prioridade: 'media',
          dataEntrega: '2024-12-31',
        },
        {
          id: '2',
          nome: 'Projeto 2',
          descricao: 'Descrição 2',
          status: 'pendente',
          prioridade: 'media',
          dataEntrega: '2024-12-31',
        },
        {
          id: '3',
          nome: 'Projeto 3',
          descricao: 'Descrição 3',
          status: 'pendente',
          prioridade: 'media',
          dataEntrega: '2024-12-31',
        },
      ];

      localStorageMock.setItem('projetos', JSON.stringify(projetos));

      projetoService.deleteMany(['1', '3']);
      const projetosRestantes = projetoService.getAll();
      expect(projetosRestantes).toHaveLength(1);
      expect(projetosRestantes[0].id).toBe('2');
    });

    it('deve funcionar mesmo quando alguns IDs não existem', () => {
      const projetos: Projeto[] = [
        {
          id: '1',
          nome: 'Projeto 1',
          descricao: 'Descrição 1',
          status: 'pendente',
          prioridade: 'media',
          dataEntrega: '2024-12-31',
        },
      ];

      localStorageMock.setItem('projetos', JSON.stringify(projetos));

      projetoService.deleteMany(['1', '999']);
      const projetosRestantes = projetoService.getAll();
      expect(projetosRestantes).toHaveLength(0);
    });
  });
});

