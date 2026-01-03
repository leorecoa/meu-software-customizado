import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projetoService } from '../services/projetoService';
import { ProjetoCard } from '../components/ProjetoCard';
import { ProjetoForm } from '../components/ProjetoForm';
import { Toast } from '../components/Toast';
import { Button } from '../components/Button';
import { SkeletonCard } from '../components/SkeletonCard';
import { Modal } from '../components/Modal';
import { StatusChart } from '../components/StatusChart';
import { useTheme } from '../contexts/ThemeContext';
import type { Projeto } from '../types/Projeto';
import { useProjetos } from '../hooks/useProjetos';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [projetoEmEdicao, setProjetoEmEdicao] = useState<Projeto | null>(null);
    const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);

    const {
        projetos,
        setProjetos,
        loading,
        projetosExibidos,
        projetosOrdenados,
        termoBusca,
        setTermoBusca,
        filtroStatus,
        setFiltroStatus,
        filtroPrioridade,
        setFiltroPrioridade,
        limparFiltros,
        paginaAtual,
        setPaginaAtual,
        totalPaginas,
    } = useProjetos();

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
    };
    const handleSaveProjeto = async (dadosProjeto: Omit<Projeto, 'id'>) => {
        if (projetoEmEdicao) {
            // MODO EDIÇÃO
            const projetoAtualizado = { ...dadosProjeto, id: projetoEmEdicao.id };
            await projetoService.update(projetoAtualizado);

            setProjetos((lista: Projeto[]) => lista.map((p: Projeto) => p.id === projetoAtualizado.id ? projetoAtualizado : p));
            showToast('Projeto atualizado com sucesso!', 'success');
            setProjetoEmEdicao(null); // Sai do modo de edição
        } else {
            // MODO CRIAÇÃO
            const projetoCriado = await projetoService.create(dadosProjeto);
            setProjetos((lista: Projeto[]) => [...lista, projetoCriado]);
            showToast('Projeto criado com sucesso!', 'success');
        }
    };

    const handleEditClick = (projeto: Projeto) => {
        setProjetoEmEdicao(projeto);
        // Rola a página para o topo para ver o formulário
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Apenas abre o modal
    const handleDeleteClick = (id: number) => {
        setIdParaExcluir(id);
    };

    // Executa a exclusão de fato
    const confirmarExclusao = async () => {
        if (idParaExcluir === null) return;

        await projetoService.delete(idParaExcluir);
        setProjetos((listaAtual: Projeto[]) => listaAtual.filter((projeto: Projeto) => projeto.id !== idParaExcluir));
        showToast('Projeto excluído com sucesso!', 'success');
        setIdParaExcluir(null); // Fecha o modal
    };

    // Função para exportar a lista atual para CSV
    const handleExportCSV = () => {
        const headers = ['ID', 'Nome', 'Descrição', 'Status', 'Prioridade', 'Data de Entrega'];

        const csvContent = [
            headers.join(','),
            ...projetosOrdenados.map((p: Projeto) => [
                p.id,
                `"${p.nome}"`, // Aspas para evitar que vírgulas no texto quebrem o CSV
                `"${p.descricao}"`,
                p.status,
                p.prioridade,
                p.dataEntrega
            ].join(','))
        ].join('\n');

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'projetos.csv';
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.header}>
                <h1>Painel de Projetos</h1>
                <button
                    onClick={toggleTheme}
                    title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                    className={styles.themeToggle}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Modal de Confirmação */}
            <Modal
                isOpen={idParaExcluir !== null}
                title="Excluir Projeto"
                message="Tem certeza que deseja excluir este projeto? Essa ação não pode ser desfeita."
                onConfirm={confirmarExclusao}
                onCancel={() => setIdParaExcluir(null)}
                confirmLabel="Sim, Excluir"
            />

            {/* Adicionamos o formulário aqui */}
            <ProjetoForm
                onSave={handleSaveProjeto}
                initialData={projetoEmEdicao}
                onCancel={() => setProjetoEmEdicao(null)}
            />

            {/* Gráfico de Status */}
            {!loading && projetos.length > 0 && (
                <StatusChart projetos={projetos} />
            )}

            {/* Barra de Pesquisa */}
            <div className={styles.filtersContainer}>
                <input
                    type="text"
                    placeholder="🔍 Pesquisar projeto..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className={styles.searchInput}
                />
                <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value as Projeto['status'] | 'todos')}
                    className={styles.filterSelect}
                >
                    <option value="todos">Todos os Status</option>
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                </select>
                <select
                    value={filtroPrioridade}
                    onChange={(e) => setFiltroPrioridade(e.target.value as Projeto['prioridade'] | 'todos')}
                    className={styles.filterSelect}
                >
                    <option value="todos">Todas Prioridades</option>
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                </select>
                <Button
                    label="Exportar"
                    onClick={handleExportCSV}
                    variant="secondary"
                    title="Baixar lista filtrada em CSV"
                />
                <Button
                    label="Limpar"
                    onClick={limparFiltros}
                    variant="secondary"
                    title="Limpar todos os filtros"
                />
            </div>

            {/* Renderização dos projetos extraída para evitar ternário aninhado */}
            {(() => {
                let conteudoProjetos;
                if (loading) {
                    const skeletonKeys = ['skeleton-1', 'skeleton-2', 'skeleton-3'];
                    conteudoProjetos = skeletonKeys.map((key) => (
                        <SkeletonCard key={key} />
                    ));
                } else if (projetosOrdenados.length > 0) {
                    conteudoProjetos = projetosExibidos.map((proj: Projeto) => (
                        <ProjetoCard
                            key={proj.id}
                            projeto={proj}
                            onClick={(id) => navigate(`/projetos/${id}`)}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ));
                } else {
                    conteudoProjetos = (
                        <div className={styles.emptyState}>
                            <h3>{projetos.length > 0 ? 'Nenhum resultado encontrado' : 'Nenhum projeto cadastrado'}</h3>
                            <p>
                                {projetos.length > 0 ? 'Tente ajustar seus termos de pesquisa ou filtros.' : 'Utilize o formulário acima para criar o primeiro projeto.'}
                            </p>
                        </div>
                    );
                }
                return <div className={styles.gridProjetos}>{conteudoProjetos}</div>;
            })()}

            {/* Controles de Paginação */}
            {totalPaginas > 1 && (
                <div className={styles.pagination}>
                    <Button
                        label="Anterior"
                        onClick={() => setPaginaAtual((p: number) => Math.max(1, p - 1))}
                        disabled={paginaAtual === 1}
                        variant="secondary"
                    />
                    <span>Página {paginaAtual} de {totalPaginas}</span>
                    <Button
                        label="Próxima"
                        onClick={() => setPaginaAtual((p: number) => Math.min(totalPaginas, p + 1))}
                        disabled={paginaAtual === totalPaginas}
                        variant="secondary"
                    />
                </div>
            )}
        </div>
    );
};
