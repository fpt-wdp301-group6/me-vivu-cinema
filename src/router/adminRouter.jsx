import config from '../config';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Dashboard';
import TheaterList from '../pages/Theater';

const router = {
    path: config.routes.cinema,
    element: <AdminLayout />,
    children: [
        { index: true, element: <Dashboard /> },
        { path: config.routes.theater, element: <TheaterList /> },
    ],
};

export default router;
