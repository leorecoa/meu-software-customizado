import { useState, useMemo, memo, useCallback, useRef, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from './revisaohooks.module.css';

// Componente Filho que só renderiza se as props mudarem
const ComponenteFilho = memo(({ texto, onButtonClick }: { texto: string, onButtonClick: () => void }) => {
    return <div className={styles.childComponent}>
        <h3 className={styles.childTitle}>👶 Componente Filho (Memoized)</h3>
        <p className={styles.childText}>{texto}</p>
        <button onClick={onButtonClick} className={`${styles.button} ${styles.childButton}`}>Clique em Mim (Filho)</button>
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

    const handleIncrement = () => {
        dispatch({ type: 'incrementar' });
    };

    // Para testar não renderização: atualizar para o mesmo valor causa um "Bailout"
    const handleSameState = () => {
        dispatch({ type: 'noop' });
    };

    // Função a ser passada para o filho.
    // Envolvida com useCallback para que sua referência não mude a cada renderização do pai.
    const handleChildClick = useCallback(() => { }, []);

    const handleFocarInput = () => {
        // Acessa o elemento DOM diretamente
        inputRef.current?.focus();
    };

    const handleIncrementarRef = () => {
        contadorComRef.current++;
        // Note que o componente NÃO renderiza novamente ao clicar aqui.
    };

    // 2. Cria uma função que usa o navigate
    const handleNavigateHome = () => {
        navigate('/'); // Navega para a rota raiz
    };

    // 1. Cálculo pesado que depende do 'count'
    const resultadoCalculoPesado = useMemo(() => {
        // Simula uma operação que consome muito processamento
        let resultado = 0;
        for (let i = 0; i < state.count * 100000000; i++) {
            resultado += i;
        }
        return resultado;
    }, [state.count]); // 2. Array de dependências: só executa se 'state.count' mudar

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Revisão de Hooks</h1>
                <p>ID da Sessão: <span>{id || 'N/A'}</span></p>
            </div>

            {/* CARD 1: Contador e Estado Principal */}
            <div className={styles.card}>
                <h2>🔢 Contador (useReducer)</h2>
                <div className={styles.countDisplay}>
                    {state.count}
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={handleIncrement} className={`${styles.button} ${styles.incrementButton}`}>
                        + Incrementar
                    </button>
                    <button onClick={handleSameState} className={`${styles.button} ${styles.secondaryButton}`}>
                        Manter Estado (Teste Bailout)
                    </button>
                    <button onClick={() => dispatch({ type: 'reset' })} className={`${styles.button} ${styles.dangerButton}`}>
                        Resetar
                    </button>
                </div>
            </div>

            {/* CARD 2: Otimização e Toggle */}
            <div className={styles.card}>
                <h2>⚡ Performance (useMemo & Callback)</h2>
                <div className={styles.perfGrid}>
                    <div>
                        <span className={styles.label}>Cálculo Pesado (useMemo):</span>
                        <span className={styles.monospace}>{resultadoCalculoPesado}</span>
                    </div>
                    <div>
                        <span className={styles.label}>Toggle Estado:</span>
                        <span className={`${styles.toggleBadge} ${toggle ? styles.toggleOn : styles.toggleOff}`}>
                            {toggle ? "ON" : "OFF"}
                        </span>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={() => setToggle(!toggle)} className={`${styles.button} ${styles.primaryButton}`}>
                        Alternar Toggle (Sem Recálculo)
                    </button>
                </div>

                <p className={styles.infoText}>
                    ℹ️ Dica: Abra o console (F12). "Cálculo Pesado" só roda ao incrementar, não ao alternar o toggle.
                </p>

                {/* Componente Filho Memoizado */}
                <ComponenteFilho texto={`O contador é: ${state.count}`} onButtonClick={handleChildClick} />
            </div>

            {/* CARD 3: Referências (useRef) */}
            <div className={styles.card}>
                <h2>🔗 Referências (useRef)</h2>
                <p>Contador Ref (Interno): <strong>{contadorComRef.current}</strong> <small>(não atualiza tela)</small></p>

                <div className={styles.inputGroup}>
                    <input ref={inputRef} type="text" placeholder="Digite algo..." className={styles.input} />
                    <button onClick={handleFocarInput} className={`${styles.button} ${styles.warningButton}`}>
                        Focar Input
                    </button>
                    <button onClick={handleIncrementarRef} className={`${styles.button} ${styles.outlineButton}`}>
                        Incrementar Ref (Log)
                    </button>
                </div>
            </div>

            <div className={styles.footerNav}>
                <button onClick={handleNavigateHome} className={styles.backButton}>
                    ← Voltar para a Home
                </button>
            </div>
        </div>
    );
}