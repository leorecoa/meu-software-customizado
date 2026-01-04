import React, { useState, useEffect, useRef } from 'react';
import type { Projeto } from '../types/Projeto';
import styles from './ProjetoForm.module.css';
import { Button } from './Button';

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
    const [dataVisual, setDataVisual] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDateInvalid, setIsDateInvalid] = useState(false);
    const hiddenDateRef = useRef<HTMLInputElement>(null);

    // Obtém a data de hoje no formato YYYY-MM-DD para validação
    const hoje = new Date();
    const dataMinima = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

    // Helper para formatar YYYY-MM-DD para DD/MM/YYYY
    const formatarParaBR = (isoDate: string) => {
        if (!isoDate) return '';
        const [ano, mes, dia] = isoDate.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    // Efeito para preencher o formulário quando entrarmos em modo de edição
    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome);
            setDescricao(initialData.descricao);
            setStatus(initialData.status);
            setPrioridade(initialData.prioridade);
            setDataEntrega(initialData.dataEntrega);
            setDataVisual(formatarParaBR(initialData.dataEntrega));
        } else {
            // Limpa o formulário se sairmos do modo de edição
            setNome('');
            setDescricao('');
            setStatus('pendente');
            setPrioridade('media');
            setDataEntrega('');
            setDataVisual('');
        }
    }, [initialData]);

    const handleDataVisualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove tudo que não é dígito
        let v = e.target.value.replaceAll(/\D/g, '');
        if (v.length > 8) v = v.slice(0, 8);

        // Aplica a máscara DD/MM/AAAA
        let formatted = v;
        if (v.length > 4) {
            formatted = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
        } else if (v.length > 2) {
            formatted = `${v.slice(0, 2)}/${v.slice(2)}`;
        }

        setDataVisual(formatted);

        // Se a data estiver completa (8 dígitos), tenta converter para ISO e validar
        if (v.length === 8) {
            const dia = v.slice(0, 2);
            const mes = v.slice(2, 4);
            const ano = v.slice(4);
            const isoDate = `${ano}-${mes}-${dia}`;

            const dateObj = new Date(isoDate);
            // Verifica se é uma data válida (ex: não aceita 32/01)
            if (!Number.isNaN(dateObj.getTime()) && dateObj.toISOString().slice(0, 10) === isoDate) {
                setDataEntrega(isoDate);
                setIsDateInvalid(false);
            } else {
                setDataEntrega(''); // Data inválida
                setIsDateInvalid(true);
            }
        } else {
            setDataEntrega(''); // Data incompleta
            setIsDateInvalid(false);
        }
    };

    const handleCalendarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isoDate = e.target.value;
        if (isoDate) {
            setDataEntrega(isoDate);
            setDataVisual(formatarParaBR(isoDate));
            setIsDateInvalid(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação básica
        if (!nome || !descricao || !dataEntrega) return;

        if (dataEntrega < dataMinima) {
            alert('A data de entrega não pode ser no passado.');
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
            setDataVisual('');
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar o projeto.');
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
                    <div className={styles.dateWrapper}>
                        <input
                            id="dataEntrega"
                            type="text"
                            placeholder="dd/mm/aaaa"
                            value={dataVisual}
                            onChange={handleDataVisualChange}
                            required
                            className={`${styles.input} ${styles.inputDate} ${isDateInvalid ? styles.inputError : ''}`}
                            maxLength={10}
                        />
                        <button
                            type="button"
                            className={styles.calendarIcon}
                            onClick={() => hiddenDateRef.current?.showPicker()}
                            tabIndex={-1}
                            title="Selecionar data"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </button>
                        {/* Input oculto para manter a funcionalidade do calendário nativo */}
                        <input
                            type="date"
                            ref={hiddenDateRef}
                            onChange={handleCalendarSelect}
                            min={dataMinima}
                            style={{ opacity: 0, position: 'absolute', pointerEvents: 'none', width: 0, height: 0 }}
                            tabIndex={-1}
                        />
                    </div>
                    {isDateInvalid && <span className={styles.errorMessage}>Data inválida.</span>}
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