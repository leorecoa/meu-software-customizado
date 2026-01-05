import { useState } from "react";

export default function RevisaoHooks() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    return (
        <div>
            <h1>Contador: {count}</h1>
            <button onClick={handleIncrement}>
                Incrementar
            </button>
        </div>
    );
}