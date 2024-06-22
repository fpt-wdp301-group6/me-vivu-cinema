import config from '../config';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Theater from '../pages/Theater';
import Room from '../pages/Room';
import Food from '../pages/Food';

const router = {
    path: config.routes.cinema,
    element: <AdminLayout />,
    children: [
        { index: true, element: <Dashboard /> },
        { path: config.routes.theater, element: <Theater /> },
        { path: config.routes.room, element: <Room /> },
        { path: config.routes.food, element: <Food /> },
    ],
};

export default router;
