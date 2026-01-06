import { useState, useMemo, memo, useCallback, useRef, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Componente Filho que só renderiza se as props mudarem
const ComponenteFilho = memo(({ texto, onButtonClick }: { texto: string, onButtonClick: () => void }) => {
    console.log("ComponenteFilho renderizou! (Não deve aparecer ao alterar o Toggle)");
    return <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1e40af', fontSize: '1.1rem' }}>👶 Componente Filho (Memoized)</h3>
        <p style={{ margin: '0 0 15px 0', color: '#3b82f6' }}>{texto}</p>
        <button onClick={onButtonClick} style={{ ...styles.button, backgroundColor: '#3b82f6', color: 'white' }}>Clique em Mim (Filho)</button>
    </div>;
});

// --- Lógica para o useReducer ---
// 1. Definimos a forma do nosso estado
interface ContadorState {
    count: number;
}
// 2. Definimos as ações possíveis
type ContadorAction = { type: 'incrementar' } | { type: 'reset' } | { type: 'noop' };

// 3. Criamos o estado inicial
const initialState: ContadorState = { count: 0 };

// 4. Criamos a função reducer que centraliza a lógica de atualização
function contadorReducer(state: ContadorState, action: ContadorAction): ContadorState {
    switch (action.type) {
        case 'incrementar':
            return { count: state.count + 1 };
        case 'reset':
            return initialState;
        case 'noop':
            return state; // Retorna o mesmo estado para testar o Bailout
        default:
            throw new Error("Ação desconhecida");
    }
}

// --- Estilos Inline para organização ---
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: '#333',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f0f0f0',
    },
    buttonGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '15px',
    },
    button: {
        padding: '10px 16px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '0.9rem',
        transition: 'transform 0.1s, opacity 0.2s',
    },
    input: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '300px',
        marginRight: '10px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 600,
        color: '#555',
    }
};

export default function RevisaoHooks() {
    // Lê o parâmetro 'id' da URL (ex: /hooks/1)
    const { id } = useParams();
    // 1. Pega a função de navegação do hook
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(contadorReducer, initialState);
    const [toggle, setToggle] = useState(false);

    // --- Exemplo de useRef ---
    // 1. Para acessar o DOM
    const inputRef = useRef<HTMLInputElement>(null);
    // 2. Para guardar um valor que não dispara re-render
    const contadorComRef = useRef(0);

    // Para analisar: este log aparecerá sempre que o componente renderizar
    console.log("RevisaoHooks renderizou! Estado atual:", state.count);

    const handleIncrement = () => {
        dispatch({ type: 'incrementar' });
    };

    // Para testar não renderização: atualizar para o mesmo valor causa um "Bailout"
    const handleSameState = () => {
        console.log("Botão clicado! O estado não mudou, então o React não deve renderizar.");
        dispatch({ type: 'noop' });
    };

    // Função a ser passada para o filho.
    // Envolvida com useCallback para que sua referência não mude a cada renderização do pai.
    const handleChildClick = useCallback(() => {
        // Agora acessamos o valor de 'count' aqui dentro
        console.log("Botão do filho foi clicado! O valor atual é:", state.count);
    }, [state.count]); // Adicionamos 'state.count' nas dependências.

    const handleFocarInput = () => {
        // Acessa o elemento DOM diretamente
        inputRef.current?.focus();
    };

    const handleIncrementarRef = () => {
        contadorComRef.current++;
        console.log("Valor do contador com useRef:", contadorComRef.current);
        // Note que o componente NÃO renderiza novamente ao clicar aqui.
    };

    // 2. Cria uma função que usa o navigate
    const handleNavigateHome = () => {
        console.log("Navegando para a página inicial programaticamente...");
        navigate('/'); // Navega para a rota raiz
    };

    // 1. Cálculo pesado que depende do 'count'
    const resultadoCalculoPesado = useMemo(() => {
        console.log("EXECUTANDO CÁLCULO PESADO...");
        // Simula uma operação que consome muito processamento
        let resultado = 0;
        for (let i = 0; i < state.count * 100000000; i++) {
            resultado += i;
        }
        return resultado;
    }, [state.count]); // 2. Array de dependências: só executa se 'state.count' mudar

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Revisão de Hooks</h1>
                <p style={{ color: '#666' }}>ID da Sessão: <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{id || 'N/A'}</span></p>
            </div>

            {/* CARD 1: Contador e Estado Principal */}
            <div style={styles.card}>
                <h2 style={{ marginTop: 0 }}>🔢 Contador (useReducer)</h2>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981', margin: '10px 0' }}>
                    {state.count}
                </div>

                <div style={styles.buttonGroup}>
                    <button onClick={handleIncrement} style={{ ...styles.button, backgroundColor: '#10b981', color: 'white' }}>
                        + Incrementar
                    </button>
                    <button onClick={handleSameState} style={{ ...styles.button, backgroundColor: '#6b7280', color: 'white' }}>
                        Manter Estado (Teste Bailout)
                    </button>
                    <button onClick={() => dispatch({ type: 'reset' })} style={{ ...styles.button, backgroundColor: '#ef4444', color: 'white' }}>
                        Resetar
                    </button>
                </div>
            </div>

            {/* CARD 2: Otimização e Toggle */}
            <div style={styles.card}>
                <h2 style={{ marginTop: 0 }}>⚡ Performance (useMemo & Callback)</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <span style={styles.label}>Cálculo Pesado (useMemo):</span>
                        <span style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}>{resultadoCalculoPesado}</span>
                    </div>
                    <div>
                        <span style={styles.label}>Toggle Estado:</span>
                        <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: toggle ? '#dcfce7' : '#fee2e2', color: toggle ? '#166534' : '#991b1b', fontWeight: 'bold' }}>
                            {toggle ? "ON" : "OFF"}
                        </span>
                    </div>
                </div>

                <div style={styles.buttonGroup}>
                    <button onClick={() => setToggle(!toggle)} style={{ ...styles.button, backgroundColor: '#8b5cf6', color: 'white' }}>
                        Alternar Toggle (Sem Recálculo)
                    </button>
                </div>

                <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    ℹ️ Dica: Abra o console (F12). "Cálculo Pesado" só roda ao incrementar, não ao alternar o toggle.
                </p>

                {/* Componente Filho Memoizado */}
                <ComponenteFilho texto={`O contador é: ${state.count}`} onButtonClick={handleChildClick} />
            </div>

            {/* CARD 3: Referências (useRef) */}
            <div style={styles.card}>
                <h2 style={{ marginTop: 0 }}>🔗 Referências (useRef)</h2>
                <p style={{ marginBottom: '15px' }}>Contador Ref (Interno): <strong>{contadorComRef.current}</strong> <small>(não atualiza tela)</small></p>

                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <input ref={inputRef} type="text" placeholder="Digite algo..." style={styles.input} />
                    <button onClick={handleFocarInput} style={{ ...styles.button, backgroundColor: '#f59e0b', color: 'white' }}>
                        Focar Input
                    </button>
                    <button onClick={handleIncrementarRef} style={{ ...styles.button, border: '1px solid #ccc', backgroundColor: 'transparent' }}>
                        Incrementar Ref (Log)
                    </button>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button onClick={handleNavigateHome} style={{ ...styles.button, backgroundColor: 'transparent', color: '#666', textDecoration: 'underline' }}>
                    ← Voltar para a Home
                </button>
            </div>
        </div>
    );
}