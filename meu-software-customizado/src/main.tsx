import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';
import './dark-mode.css';
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Failed to find the root element to mount the application.');
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <ToastContainer
                    theme="colored"
                    autoClose={3000}
                    position="bottom-right"
                    aria-label="Área de notificações"
                />
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
