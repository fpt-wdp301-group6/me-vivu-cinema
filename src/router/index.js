import { createBrowserRouter } from 'react-router-dom';
import adminRouter from './adminRouter';
import authRouter from './authRouter';

const router = createBrowserRouter(
    [authRouter, adminRouter].map((route) => {
        return { ...route };
    }),
);

export default router;
