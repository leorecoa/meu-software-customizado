import { useEffect, useMemo, useState } from 'react';
import { projetoService } from '../services/projetoService';
import type { Projeto } from '../types/Projeto';

type FiltroStatus = Projeto['status'] | 'todos';
type FiltroPrioridade = Projeto['prioridade'] | 'todos';

export const useProjetos = () => {
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [loading, setLoading] = useState(true);

    const [termoBusca, setTermoBusca] = useState('');
    const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('todos');
    const [filtroPrioridade, setFiltroPrioridade] =
        useState<FiltroPrioridade>('todos');

    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 6;

    // 🔄 Carrega projetos
    useEffect(() => {
        const carregarProjetos = async () => {
            try {
                setLoading(true);
                const dados = await projetoService.getAll();
                setProjetos(dados);
            } finally {
                setLoading(false);
            }
        };

        carregarProjetos();
    }, []);

    // 🔍 Filtro + busca
    const projetosFiltrados = useMemo(() => {
        return projetos.filter((p) => {
            const matchBusca =
                p.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                p.descricao.toLowerCase().includes(termoBusca.toLowerCase());

            const matchStatus =
                filtroStatus === 'todos' || p.status === filtroStatus;

            const matchPrioridade =
                filtroPrioridade === 'todos' || p.prioridade === filtroPrioridade;

            return matchBusca && matchStatus && matchPrioridade;
        });
    }, [projetos, termoBusca, filtroStatus, filtroPrioridade]);

    // 🔢 Ordenação (exemplo: por data)
    const projetosOrdenados = useMemo(() => {
        return [...projetosFiltrados].sort((a, b) =>
            a.dataEntrega.localeCompare(b.dataEntrega)
        );
    }, [projetosFiltrados]);

    // 📄 Paginação
    const totalPaginas = Math.ceil(projetosOrdenados.length / itensPorPagina);

    const projetosExibidos = useMemo(() => {
        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = inicio + itensPorPagina;
        return projetosOrdenados.slice(inicio, fim);
    }, [projetosOrdenados, paginaAtual]);

    // 🧹 Limpar filtros
    const limparFiltros = () => {
        setTermoBusca('');
        setFiltroStatus('todos');
        setFiltroPrioridade('todos');
        setPaginaAtual(1);
    };

    return {
        projetos,
        setProjetos,
        loading,

        termoBusca,
        setTermoBusca,

        filtroStatus,
        setFiltroStatus,

        filtroPrioridade,
        setFiltroPrioridade,

        projetosExibidos,
        projetosOrdenados,

        paginaAtual,
        setPaginaAtual,
        totalPaginas,

        limparFiltros,
    };
};
