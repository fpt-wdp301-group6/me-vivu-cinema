import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import config from '~/config';
import { Stack } from '@mui/material';
import NavList from './NavList';
import SpeedIcon from '@mui/icons-material/Speed';
import TheatersIcon from '@mui/icons-material/Theaters';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IcecreamIcon from '@mui/icons-material/Icecream';

const Sidebar = () => {
    return (
        <div className="fixed w-[260px] h-full">
            <div className="mb-4 text-center">
                <Link to={config.routes.cinema} className="text-4xl font-bold leading-[64px]">
                    me<span className="text-primary">Vivu</span>
                </Link>
            </div>
            <SimpleBar className="px-2 mb-16" style={{ height: 'calc(100% - 64px)' }}>
                <Stack gap={1}>
                    {NAV_LISTS.map((list, index) => (
                        <NavList key={index} subheader={list.subheader} navigation={list.navigation} />
                    ))}
                </Stack>
            </SimpleBar>
        </div>
    );
};

const NAV_LISTS = [
    {
        subheader: 'Tổng quan',
        navigation: [
            {
                icon: <SpeedIcon />,
                text: 'Dashboard',
                href: config.routes.cinema,
            },
        ],
    },
    {
        subheader: 'Quản lý',
        navigation: [
            {
                icon: <TheatersIcon />,
                text: 'Rạp chiếu phim',
                href: config.routes.theater.base,
            },
            {
                icon: <MeetingRoomIcon />,
                text: 'Phòng chiếu',
                href: config.routes.room.base,
            },
            {
                icon: <IcecreamIcon />,
                text: 'Đồ ăn theo rạp',
                href: config.routes.theater.food,
            },
            {
                icon: <FastfoodIcon />,
                text: 'Đồ ăn',
                href: config.routes.food,
            },
            {
                icon: <CalendarMonthIcon />,
                text: 'Lịch chiếu',
                href: config.routes.showtime,
            },
        ],
    },
];

export default Sidebar;
