import { describe, it, expect, beforeEach } from 'vitest';
import { projetoService } from './projetoService';
import type { Projeto } from '../types/Projeto';

describe('projetoService', () => {
    // Antes de cada teste, limpamos o localStorage para garantir que um teste
    // não interfira no resultado do outro.
    beforeEach(() => {
        localStorage.clear();
    });

    describe('getById', () => {
        it('deve retornar um projeto específico quando um ID válido é fornecido', async () => {
            // O próprio serviço irá popular o localStorage com dados iniciais na primeira chamada,
            // pois ele estará vazio.
            const projeto = await projetoService.getById(1);

            expect(projeto).not.toBeNull();
            expect(projeto?.id).toBe(1);
            expect(projeto?.nome).toBe('Desenvolvimento de E-commerce');
        });

        it('deve retornar null quando um ID inválido ou inexistente é fornecido', async () => {
            const projeto = await projetoService.getById(999);
            expect(projeto).toBeNull();
        });
    });

    describe('create', () => {
        it('deve criar um novo projeto e adicioná-lo à lista', async () => {
            const novoProjetoData: Omit<Projeto, 'id'> = {
                nome: 'Novo Projeto de Teste',
                descricao: 'Descrição do novo projeto.',
                status: 'pendente',
                prioridade: 'baixa',
                dataEntrega: '2027-01-01',
            };

            const projetoCriado = await projetoService.create(novoProjetoData);

            // Verifica se o projeto retornado tem os dados corretos e um ID (4, pois existem 3 iniciais)
            expect(projetoCriado.id).toBe(4);
            expect(projetoCriado.nome).toBe(novoProjetoData.nome);
            expect(projetoCriado.status).toBe('pendente');

            // Verifica se o projeto foi realmente adicionado
            const todosProjetos = await projetoService.getAll();
            expect(todosProjetos.length).toBe(4);
            expect(todosProjetos.find(p => p.id === projetoCriado.id)).toBeDefined();
        });
    });

    describe('update', () => {
        it('deve atualizar um projeto existente com sucesso', async () => {
            const idParaAtualizar = 2;
            const dadosAtualizados: Projeto = {
                id: idParaAtualizar,
                nome: 'Nome do Projeto Atualizado',
                descricao: 'Descrição atualizada.',
                status: 'em_andamento',
                prioridade: 'alta',
                dataEntrega: '2026-12-31',
            };

            await projetoService.update(dadosAtualizados);

            const projetoVerificado = await projetoService.getById(idParaAtualizar);
            expect(projetoVerificado?.nome).toBe('Nome do Projeto Atualizado');
            expect(projetoVerificado?.status).toBe('em_andamento');
        });
    });

    describe('delete', () => {
        it('deve excluir um projeto com sucesso', async () => {
            const idParaExcluir = 1;

            // Garante que os dados iniciais foram carregados
            let projetos = await projetoService.getAll();
            expect(projetos.find(p => p.id === idParaExcluir)).toBeDefined();

            await projetoService.delete(idParaExcluir);

            // Verifica se o projeto foi realmente removido da lista
            projetos = await projetoService.getAll();
            expect(projetos.find(p => p.id === idParaExcluir)).toBeUndefined();
            expect(projetos.length).toBe(2);
        });
    });
});