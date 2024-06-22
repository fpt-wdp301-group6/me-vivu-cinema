import React from 'react';
import ReactDOM from 'react-dom/client';
import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import App from './App';
import MuiProvider from './contexts/MuiProvider';
import AuthProvider from './contexts/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <MuiProvider>
            <App />
        </MuiProvider>
    </AuthProvider>,
);
