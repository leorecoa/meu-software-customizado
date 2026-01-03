import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import styles from './Login.module.css';
import formStyles from '../components/ProjetoForm.module.css'; // Reutilizando estilos de input

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulação de autenticação simples
        if (email && senha) {
            // Aqui você faria a chamada real para a API de login
            navigate('/dashboard');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleLogin} className={styles.form}>
                <h2 className={styles.title}>Login</h2>

                <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={formStyles.input}
                    />
                </div>

                <div className={styles.field} style={{ marginBottom: '20px' }}>
                    <label htmlFor="senha" className={styles.label}>Senha:</label>
                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        className={formStyles.input}
                    />
                </div>

                <Button label="Entrar" type="submit" style={{ width: '100%' }} />
            </form>
        </div>
    );
};