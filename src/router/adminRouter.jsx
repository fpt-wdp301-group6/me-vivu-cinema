import config from '../config';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Dashboard';
import TheaterList from '../pages/Theater';
import TheaterCreate from '~/pages/Theater/TheaterCreate';

const router = {
    path: config.routes.cinema,
    element: <AdminLayout />,
    children: [
        { index: true, element: <Dashboard /> },
        { path: config.routes.theater.list, element: <TheaterList /> },
        { path: config.routes.theater.create, element: <TheaterCreate /> },
    ],
};

export default router;
