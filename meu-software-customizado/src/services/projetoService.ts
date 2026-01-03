import type { Projeto } from '../types/Projeto';

const STORAGE_KEY = '@app:projetos';

// Simula um banco de dados local com alguns dados iniciais se não houver nada no localStorage
const getInitialProjetos = (): Projeto[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    }
    // Dados iniciais para demonstração
    const initialData: Projeto[] = [
        { id: 1, nome: 'Desenvolvimento de E-commerce', descricao: 'Plataforma completa de vendas online.', status: 'em_andamento', prioridade: 'alta', dataEntrega: '2026-08-15' },
        { id: 2, nome: 'Aplicativo Mobile de Fitness', descricao: 'App para monitoramento de atividades físicas.', status: 'pendente', prioridade: 'media', dataEntrega: '2026-09-01' },
        { id: 3, nome: 'Migração de Servidores', descricao: 'Mover infraestrutura para novo provedor de nuvem.', status: 'concluido', prioridade: 'alta', dataEntrega: '2026-06-20' },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
};

const getProjetosFromStorage = (): Projeto[] => {
    return getInitialProjetos();
};

const saveProjetosToStorage = (projetos: Projeto[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projetos));
};

export const projetoService = {
    /**
     * Busca todos os projetos.
     */
    getAll: async (): Promise<Projeto[]> => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simula latência da rede
        return getProjetosFromStorage();
    },

    /**
     * Busca um projeto específico pelo seu ID.
     */
    getById: async (id: number): Promise<Projeto | null> => {
        await new Promise(resolve => setTimeout(resolve, 300)); // Simula latência da rede
        const projetos = getProjetosFromStorage();
        const projeto = projetos.find(p => p.id === id);
        return projeto || null;
    },

    create: async (novoProjeto: Omit<Projeto, 'id'>): Promise<Projeto> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const projetos = getProjetosFromStorage();
        const novoId = projetos.length > 0 ? Math.max(...projetos.map(p => p.id)) + 1 : 1;
        const projetoCriado = { ...novoProjeto, id: novoId };
        saveProjetosToStorage([...projetos, projetoCriado]);
        return projetoCriado;
    },

    update: async (projetoAtualizado: Projeto): Promise<Projeto> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        let projetos = getProjetosFromStorage();
        projetos = projetos.map(p => (p.id === projetoAtualizado.id ? projetoAtualizado : p));
        saveProjetosToStorage(projetos);
        return projetoAtualizado;
    },

    delete: async (id: number): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        let projetos = getProjetosFromStorage();
        projetos = projetos.filter(p => p.id !== id);
        saveProjetosToStorage(projetos);
    },
};