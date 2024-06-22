import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ToastContainer } from 'react-toastify';
import { ConfirmDialog } from './components';

const App = () => {
    return (
        <div className="App">
            <RouterProvider router={router} />
            <ToastContainer />
            <ConfirmDialog />
        </div>
    );
};

export default App;
