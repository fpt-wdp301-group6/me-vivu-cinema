import { createBrowserRouter } from 'react-router-dom';
import adminRouter from './adminRouter';

const router = createBrowserRouter(
    [adminRouter].map((route) => {
        return { ...route };
    }),
);

export default router;
