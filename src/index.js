import React from 'react';
import ReactDOM from 'react-dom/client';
import 'simplebar-react/dist/simplebar.min.css';
import './index.scss';
import App from './App';
import MuiProvider from './contexts/MuiProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MuiProvider>
            <App />
        </MuiProvider>
    </React.StrictMode>,
);
