import {
    useState,
    useMemo,
    memo,
    useCallback,
    useRef,
    useReducer
} from "react";
import { useParams, useNavigate } from "react-router-dom";

/* =========================================================
   Componente Filho — memo evita re-render desnecessário
========================================================= */
const ComponenteFilho = memo(
    ({ texto, onButtonClick }: { texto: string; onButtonClick: () => void }) => {
        console.log("👶 ComponenteFilho renderizou");

        return (
            <div
                style={{
                    marginTop: "20px",
                    padding: "15px",
                    border: "1px solid #bfdbfe",
                    backgroundColor: "#eff6ff",
                    borderRadius: "8px",
                }}
            >
                <h3 style={{ margin: "0 0 10px", color: "#1e40af" }}>
                    👶 Componente Filho (memo)
                </h3>

                <p style={{ color: "#3b82f6" }}>{texto}</p>

                <button
                    onClick={onButtonClick}
                    style={{ ...styles.button, backgroundColor: "#3b82f6", color: "white" }}
                >
                    Clique em Mim (Filho)
                </button>
            </div>
        );
    }
);

/* =========================================================
   useReducer — estado previsível
========================================================= */
interface ContadorState {
    count: number;
}

type ContadorAction =
    | { type: "incrementar" }
    | { type: "reset" }
    | { type: "noop" };

const initialState: ContadorState = { count: 0 };

function contadorReducer(
    state: ContadorState,
    action: ContadorAction
): ContadorState {
    switch (action.type) {
        case "incrementar":
            return { count: state.count + 1 };
        case "reset":
            return initialState;
        case "noop":
            return state; // bailout
        default:
            throw new Error("Ação desconhecida");
    }
}

/* =========================================================
   Estilos (TypeScript moderno com satisfies)
========================================================= */
const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#333",
    },
    header: {
        textAlign: "center",
        marginBottom: "40px",
    },
    card: {
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        border: "1px solid #f0f0f0",
    },
    buttonGroup: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "15px",
    },
    button: {
        padding: "10px 16px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "0.9rem",
        transition: "transform 0.1s, opacity 0.2s",
    },
    input: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        maxWidth: "300px",
        width: "100%",
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: 600,
        color: "#555",
    },
} satisfies Record<string, React.CSSProperties>;

/* =========================================================
   Componente Principal
========================================================= */
export default function RevisaoHooks() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(contadorReducer, initialState);
    const [toggle, setToggle] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const contadorComRef = useRef(0);

    /* useCallback evita recriação da função */
    const handleChildClick = useCallback(() => {
        console.log("Botão do filho clicado. Count:", state.count);
    }, [state.count]);

    /* ⚠️ Loop pesado proposital para demonstrar useMemo */
    const resultadoCalculoPesado = useMemo(() => {
        console.log("⚙️ Executando cálculo pesado...");
        let total = 0;

        for (let i = 0; i < state.count * 10_000_000; i++) {
            total += i;
        }

        return total;
    }, [state.count]);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Revisão de Hooks</h1>
                <p>
                    ID da Sessão: <strong>{id ?? "N/A"}</strong>
                </p>
            </header>

            {/* Contador */}
            <div style={styles.card}>
                <h2>🔢 useReducer</h2>
                <div style={{ fontSize: "3rem", color: "#10b981" }}>
                    {state.count}
                </div>

                <div style={styles.buttonGroup}>
                    <button
                        onClick={() => dispatch({ type: "incrementar" })}
                        style={{ ...styles.button, backgroundColor: "#10b981", color: "white" }}
                    >
                        Incrementar
                    </button>

                    <button
                        onClick={() => dispatch({ type: "noop" })}
                        style={{ ...styles.button, backgroundColor: "#6b7280", color: "white" }}
                    >
                        Mesmo Estado
                    </button>

                    <button
                        onClick={() => dispatch({ type: "reset" })}
                        style={{ ...styles.button, backgroundColor: "#ef4444", color: "white" }}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Performance */}
            <div style={styles.card}>
                <h2>⚡ Performance</h2>

                <p>
                    <strong>Resultado do cálculo:</strong>{" "}
                    <code>{resultadoCalculoPesado}</code>
                </p>

                <p>
                    Toggle: <strong>{toggle ? "ON" : "OFF"}</strong>
                </p>

                <button
                    onClick={() => setToggle((prev) => !prev)}
                    style={{ ...styles.button, backgroundColor: "#8b5cf6", color: "white" }}
                >
                    Alternar Toggle
                </button>

                <ComponenteFilho
                    texto={`Contador atual: ${state.count}`}
                    onButtonClick={handleChildClick}
                />
            </div>

            {/* useRef */}
            <div style={styles.card}>
                <h2>🔗 useRef</h2>

                <p>Valor interno: {contadorComRef.current}</p>

                <input ref={inputRef} placeholder="Digite algo" style={styles.input} />

                <div style={styles.buttonGroup}>
                    <button
                        onClick={() => inputRef.current?.focus()}
                        style={{ ...styles.button, backgroundColor: "#f59e0b", color: "white" }}
                    >
                        Focar Input
                    </button>

                    <button
                        onClick={() => {
                            contadorComRef.current++;
                            console.log("Ref:", contadorComRef.current);
                        }}
                        style={styles.button}
                    >
                        Incrementar Ref
                    </button>
                </div>
            </div>

            <button
                onClick={() => navigate("/")}
                style={{ ...styles.button, backgroundColor: "transparent" }}
            >
                ← Voltar para Home
            </button>
        </div>
    );
}
