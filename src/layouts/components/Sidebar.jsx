import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import config from '~/config';
import { Stack } from '@mui/material';
import NavList from './NavList';
import SpeedIcon from '@mui/icons-material/Speed';
import TheatersIcon from '@mui/icons-material/Theaters';

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
                subNav: [
                    {
                        text: 'Danh sách',
                        href: config.routes.theater.list,
                    },
                    {
                        text: 'Tạo rạp chiếu',
                        href: config.routes.theater.create,
                    },
                ],
            },
        ],
    },
];

export default Sidebar;
