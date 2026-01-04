import React, { useState, useEffect } from 'react';
import type { Projeto } from '../types/Projeto';
import styles from './ProjetoForm.module.css';
import { Button } from './Button';
import { toast } from 'react-toastify';

interface ProjetoFormProps {
    onSave: (projeto: Omit<Projeto, 'id'>) => Promise<void>;
    initialData?: Projeto | null;
    onCancel?: () => void;
}

export const ProjetoForm: React.FC<ProjetoFormProps> = ({ onSave, initialData, onCancel }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState<Projeto['status']>('pendente');
    const [prioridade, setPrioridade] = useState<Projeto['prioridade']>('media');
    const [dataEntrega, setDataEntrega] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Obtém a data de hoje no formato YYYY-MM-DD para validação
    const hoje = new Date();
    const dataMinima = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

    // Efeito para preencher o formulário quando entrarmos em modo de edição
    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome);
            setDescricao(initialData.descricao);
            setStatus(initialData.status);
            setPrioridade(initialData.prioridade);
            setDataEntrega(initialData.dataEntrega);
        } else {
            // Limpa o formulário se sairmos do modo de edição
            setNome('');
            setDescricao('');
            setStatus('pendente');
            setPrioridade('media');
            setDataEntrega('');
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação básica
        if (!nome || !descricao || !dataEntrega) return;

        if (dataEntrega < dataMinima) {
            toast.warn('A data de entrega não pode ser no passado.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSave({
                nome,
                descricao,
                status,
                prioridade,
                dataEntrega
            });

            // Limpar formulário após sucesso
            setNome('');
            setDescricao('');
            setStatus('pendente');
            setPrioridade('media');
            setDataEntrega('');
        } catch {
            // O erro já é tratado e exibido pelo componente pai (Dashboard)
        } finally {
            setIsSubmitting(false);
        }
    };

    const submittingLabel = initialData ? 'Atualizando...' : 'Cadastrando...';
    const idleLabel = initialData ? 'Salvar Alterações' : 'Adicionar Projeto';
    const buttonLabel = isSubmitting ? submittingLabel : idleLabel;

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h3 className={styles.title}>{initialData ? 'Editar Projeto' : 'Novo Projeto'}</h3>

            <div className={styles.field}>
                <label htmlFor="nome" className={styles.label}>Nome do Projeto:</label>
                <input id="nome" type="text" value={nome} onChange={e => setNome(e.target.value)} required className={styles.input} />
            </div>

            <div className={styles.field}>
                <label htmlFor="descricao" className={styles.label}>Descrição:</label>
                <textarea id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} required className={styles.input} rows={3} />
            </div>

            <div className={`${styles.field} ${styles.row}`}>
                <div className={styles.col}>
                    <label htmlFor="status" className={styles.label}>Status:</label>
                    <select id="status" value={status} onChange={e => setStatus(e.target.value as Projeto['status'])} className={styles.input}>
                        <option value="pendente">Pendente</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="concluido">Concluído</option>
                    </select>
                </div>

                <div className={styles.col}>
                    <label htmlFor="prioridade" className={styles.label}>Prioridade:</label>
                    <select id="prioridade" value={prioridade} onChange={e => setPrioridade(e.target.value as Projeto['prioridade'])} className={styles.input}>
                        <option value="baixa">Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>

                <div className={styles.col}>
                    <label htmlFor="dataEntrega" className={styles.label}>Data de Entrega:</label>
                    <input id="dataEntrega" type="date" min={dataMinima} value={dataEntrega} onChange={e => setDataEntrega(e.target.value)} required className={styles.input} />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    label={buttonLabel}
                />
                {initialData && onCancel && (
                    <Button
                        type="button"
                        label="Cancelar"
                        variant="secondary"
                        onClick={onCancel}
                    />
                )}
            </div>
        </form>
    );
};