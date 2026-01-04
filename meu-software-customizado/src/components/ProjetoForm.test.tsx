import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjetoForm } from './ProjetoForm';
import styles from './ProjetoForm.module.css';

describe('ProjetoForm', () => {
    it('não deve chamar onSave ao tentar enviar formulário com campos obrigatórios vazios', () => {
        const onSaveMock = vi.fn();
        const onCancelMock = vi.fn();

        render(<ProjetoForm onSave={onSaveMock} onCancel={onCancelMock} />);

        const submitButton = screen.getByText(/Adicionar Projeto/i);
        fireEvent.click(submitButton);

        // A validação interna do componente (if !nome...) deve impedir a chamada.
        expect(onSaveMock).not.toHaveBeenCalled();
    });

    it('deve chamar onSave com os dados corretos quando o formulário é válido', async () => {
        const onSaveMock = vi.fn();
        const onCancelMock = vi.fn();

        render(<ProjetoForm onSave={onSaveMock} onCancel={onCancelMock} />);

        // Preenche os campos
        const nomeInput = screen.getByLabelText(/Nome do Projeto/i);
        const descricaoInput = screen.getByLabelText(/Descrição/i);
        const dataInput = screen.getByLabelText(/Data de Entrega/i);

        // A data precisa ser no futuro para passar na validação
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        const ano = futureDate.getFullYear();
        const mes = String(futureDate.getMonth() + 1).padStart(2, '0');
        const dia = String(futureDate.getDate()).padStart(2, '0');
        const dataVisual = `${dia}/${mes}/${ano}`;
        const dataISO = `${ano}-${mes}-${dia}`;

        fireEvent.change(nomeInput, { target: { value: 'Projeto Teste' } });
        fireEvent.change(descricaoInput, { target: { value: 'Descrição Teste' } });
        fireEvent.change(dataInput, { target: { value: dataVisual } });

        // Submete
        const submitButton = screen.getByText(/Adicionar Projeto/i);
        fireEvent.click(submitButton);

        // Verifica se onSave FOI chamado com os dados
        expect(onSaveMock).toHaveBeenCalledTimes(1);
        expect(onSaveMock).toHaveBeenCalledWith(expect.objectContaining({
            nome: 'Projeto Teste',
            descricao: 'Descrição Teste',
            dataEntrega: dataISO
        }));
    });

    it('deve aplicar a máscara DD/MM/AAAA corretamente ao digitar', () => {
        const onSaveMock = vi.fn();
        const onCancelMock = vi.fn();

        render(<ProjetoForm onSave={onSaveMock} onCancel={onCancelMock} />);

        const dataInput = screen.getByLabelText(/Data de Entrega/i) as HTMLInputElement;

        // Digita os dois primeiros dígitos
        fireEvent.change(dataInput, { target: { value: '25' } });
        expect(dataInput.value).toBe('25');

        // Digita os próximos dois dígitos (total 4)
        fireEvent.change(dataInput, { target: { value: '2512' } });
        expect(dataInput.value).toBe('25/12');

        // Digita o ano completo (total 8)
        fireEvent.change(dataInput, { target: { value: '25122025' } });
        expect(dataInput.value).toBe('25/12/2025');

        // Tenta digitar letras
        fireEvent.change(dataInput, { target: { value: '25/12/2025abc' } });
        expect(dataInput.value).toBe('25/12/2025');

        // Tenta digitar mais números
        fireEvent.change(dataInput, { target: { value: '2512202599' } });
        expect(dataInput.value).toBe('25/12/2025');
    });

    it('deve exibir validação visual ao digitar uma data inválida', () => {
        const onSaveMock = vi.fn();
        const onCancelMock = vi.fn();

        render(<ProjetoForm onSave={onSaveMock} onCancel={onCancelMock} />);

        const dataInput = screen.getByLabelText(/Data de Entrega/i) as HTMLInputElement;

        // Digita uma data inválida (dia 32)
        fireEvent.change(dataInput, { target: { value: '32012024' } });

        // Verifica se a classe de erro foi aplicada ao input
        expect(dataInput.classList.contains(styles.inputError)).toBe(true);

        // Verifica se a mensagem de erro é exibida
        expect(screen.getByText('Data inválida.')).toBeTruthy();

        // Digita uma data válida para verificar se o erro some
        fireEvent.change(dataInput, { target: { value: '01022024' } });
        expect(dataInput.classList.contains(styles.inputError)).toBe(false);
        expect(screen.queryByText('Data inválida.')).toBeNull();
    });
});