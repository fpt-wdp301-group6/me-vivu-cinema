import Login from '~/pages/Login';
import config from '../config';
import AuthLayout from '../layouts/AuthLayout';

const router = {
    path: config.routes.login,
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
};

export default router;
