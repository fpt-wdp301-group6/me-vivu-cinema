import config from '../config';
import AuthLayout from '../layouts/AuthLayout';

const router = {
    path: config.routes.login,
    element: <AuthLayout />,
    children: [],
};

export default router;
