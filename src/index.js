import React from 'react';
import ReactDOM from 'react-dom/client';
import 'simplebar-react/dist/simplebar.min.css';
import './index.scss';
import App from './App';
import MuiProvider from './contexts/MuiProvider';
import AuthProvider from './contexts/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <MuiProvider>
                <App />
            </MuiProvider>
        </AuthProvider>
    </React.StrictMode>,
);
