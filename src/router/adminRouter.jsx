import config from '../config';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Theater from '../pages/Theater';
import Room from '../pages/Room';
import Food from '../pages/Food';
import Showtime from '../pages/Showtime';
import Seat from '~/pages/Room/SeatMap';
import TheaterFood from '~/pages/Theater/TheaterFood';

const router = {
    path: config.routes.cinema,
    element: <AdminLayout />,
    children: [
        { index: true, element: <Dashboard /> },
        { path: config.routes.theater.base, element: <Theater /> },
        { path: config.routes.theater.food, element: <TheaterFood /> },
        { path: config.routes.room.base, element: <Room /> },
        { path: config.routes.room.seat, element: <Seat /> },
        { path: config.routes.food, element: <Food /> },
        { path: config.routes.showtime, element: <Showtime /> },
    ],
};

export default router;
