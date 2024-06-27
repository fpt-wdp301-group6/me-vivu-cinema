import config from '../config';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Theater from '../pages/Theater';
import Room from '../pages/Room';
import Food from '../pages/Food';
import Seat from '~/pages/Room/SeatMap';

const router = {
    path: config.routes.cinema,
    element: <AdminLayout />,
    children: [
        { index: true, element: <Dashboard /> },
        { path: config.routes.theater, element: <Theater /> },
        { path: config.routes.room.base, element: <Room /> },
        { path: config.routes.room.seat, element: <Seat /> },
        { path: config.routes.food, element: <Food /> },
    ],
};

export default router;
