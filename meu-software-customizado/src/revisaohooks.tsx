import { useState, useMemo, memo, useCallback, useRef, useReducer } from "react";

// Componente Filho que só renderiza se as props mudarem
const ComponenteFilho = memo(({ texto, onButtonClick }: { texto: string, onButtonClick: () => void }) => {
    console.log("ComponenteFilho renderizou! (Não deve aparecer ao alterar o Toggle)");
    return <div style={{ marginTop: '20px', padding: '10px', border: '1px dashed blue' }}>
        <h3>Componente Filho (Memoized)</h3>
        <p>{texto}</p>
        <button onClick={onButtonClick}>Clique em Mim (Filho)</button>
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
        <div>
            <h1>Contador (useReducer): {state.count}</h1>
            <h2>Cálculo Pesado: {resultadoCalculoPesado}</h2>
            <h2>Toggle: {toggle ? "ON" : "OFF"}</h2>
            <h2>Contador (useRef): {contadorComRef.current} (não atualiza na tela)</h2>

            <button onClick={handleIncrement}>
                Incrementar
            </button>
            <button onClick={handleSameState} style={{ marginLeft: '10px' }}>
                Manter Estado (Teste Bailout)
            </button>
            <button onClick={() => setToggle(!toggle)} style={{ marginLeft: '10px' }}>
                Alterar Toggle (Não refaz o cálculo)
            </button>
            <button onClick={() => dispatch({ type: 'reset' })} style={{ marginLeft: '10px' }}>
                Resetar (useReducer)
            </button>

            <div style={{ marginTop: '2rem', borderTop: '2px solid #ccc', paddingTop: '1rem' }}>
                <input ref={inputRef} type="text" placeholder="Foco com useRef" />
                <button onClick={handleFocarInput} style={{ marginLeft: '10px' }}>
                    Focar no Input
                </button>
                <button onClick={handleIncrementarRef} style={{ marginLeft: '10px' }}>
                    Incrementar Ref (Ver Console)
                </button>
            </div>
            <p style={{ marginTop: '1rem', color: '#888' }}>
                Abra o console do navegador. Note que "EXECUTANDO CÁLCULO PESADO..."
                só aparece quando você clica em "Incrementar", mas não quando clica em "Alterar Toggle".
            </p>
            <p style={{ marginTop: '1rem', color: '#888' }}>
                Graças ao <code>useCallback</code>, o "ComponenteFilho" também não renderiza ao "Alterar Toggle",
                pois a função <code>handleChildClick</code> mantém a mesma referência.
            </p>

            {/* O componente filho não renderizará quando o 'toggle' mudar, pois suas props não mudaram */}
            <ComponenteFilho texto={`O contador é: ${state.count}`} onButtonClick={handleChildClick} />
        </div>
    );
}