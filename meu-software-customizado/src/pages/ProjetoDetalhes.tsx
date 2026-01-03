import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projetoService } from '../services/projetoService';
import { Button } from '../components/Button';
import { ProjetoForm } from '../components/ProjetoForm';
import { Modal } from '../components/Modal';
import type { Projeto } from '../types/Projeto';
import styles from './ProjetoDetalhes.module.css';

export const ProjetoDetalhes = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [projeto, setProjeto] = useState<Projeto | null>(null);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

    useEffect(() => {
        if (!id) return;

        const carregarProjeto = async () => {
            try {
                const dados = await projetoService.getById(Number(id));
                setProjeto(dados);
            } catch (error) {
                console.error('Erro ao carregar projeto', error);
            } finally {
                setLoading(false);
            }
        };

        carregarProjeto();
    }, [id]);

    const salvarProjeto = async (dados: Omit<Projeto, 'id'>) => {
        if (!projeto) return;

        try {
            const atualizado = { ...dados, id: projeto.id };
            await projetoService.update(atualizado);
            setProjeto(atualizado);
            setEditando(false);
        } catch (error) {
            console.error('Erro ao atualizar projeto', error);
        }
    };

    const excluirProjeto = async () => {
        if (!projeto) return;

        try {
            await projetoService.delete(projeto.id);
            navigate('/');
        } catch (error) {
            console.error('Erro ao excluir projeto', error);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Carregando...</div>;
    }

    if (!projeto) {
        return (
            <div className={styles.notFound}>
                <h2>Projeto não encontrado</h2>
                <Button label="Voltar" onClick={() => navigate('/')} />
            </div>
        );
    }

    if (editando) {
        return (
            <div className={styles.container}>
                <h2>Editar Projeto</h2>
                <ProjetoForm
                    initialData={projeto}
                    onSave={salvarProjeto}
                    onCancel={() => setEditando(false)}
                />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Modal
                isOpen={modalExcluirAberto}
                title="Excluir Projeto"
                message={`Tem certeza que deseja excluir "${projeto.nome}"? Essa ação não pode ser desfeita.`}
                onConfirm={excluirProjeto}
                onCancel={() => setModalExcluirAberto(false)}
                confirmLabel="Sim, excluir"
                variant="danger"
            />

            <header className={styles.header}>
                <h1>{projeto.nome}</h1>
                <span className={styles.status}>{projeto.status.replace('_', ' ')}</span>
            </header>

            <section className={styles.info}>
                <p><strong>Prioridade:</strong> {projeto.prioridade}</p>
                <p><strong>Entrega:</strong> {projeto.dataEntrega}</p>

                <h3>Descrição</h3>
                <p>{projeto.descricao}</p>
            </section>

            <div className={styles.actions}>
                <Button label="Voltar" variant="secondary" onClick={() => navigate('/')} />
                <Button label="Editar" onClick={() => setEditando(true)} />
                <Button
                    label="Excluir"
                    variant="danger"
                    onClick={() => setModalExcluirAberto(true)}
                />
            </div>
        </div>
    );
};
