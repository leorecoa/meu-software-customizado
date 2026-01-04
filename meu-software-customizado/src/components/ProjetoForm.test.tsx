import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjetoForm } from './ProjetoForm';

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
        const onSaveMock = vi.fn().mockResolvedValue(undefined);
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
        const dataISO = `${ano}-${mes}-${dia}`;

        fireEvent.change(nomeInput, { target: { value: 'Projeto Teste' } });
        fireEvent.change(descricaoInput, { target: { value: 'Descrição Teste' } });
        fireEvent.change(dataInput, { target: { value: dataISO } });

        // Submete
        const submitButton = screen.getByText(/Adicionar Projeto/i);
        fireEvent.click(submitButton);

        // Verifica se onSave FOI chamado com os dados
        await waitFor(() => {
            expect(onSaveMock).toHaveBeenCalledTimes(1);
        });
        expect(onSaveMock).toHaveBeenCalledWith(expect.objectContaining({
            nome: 'Projeto Teste',
            descricao: 'Descrição Teste',
            dataEntrega: dataISO
        }));
    });
});