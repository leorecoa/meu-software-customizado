import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Failed to find the root element to mount the application.');
}

ReactDOM.createRoot(rootElement).render(
    <ThemeProvider>
        <BrowserRouter>
            <ToastContainer
                theme="colored"
                autoClose={3000}
                position="bottom-right"
            />
            <App />
        </BrowserRouter>
    </ThemeProvider>
);
