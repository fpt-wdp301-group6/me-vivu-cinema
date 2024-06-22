import { useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks';
import config from '~/config';

const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !isLoading) {
            navigate(config.routes.login);
        }
    }, [user, isLoading, navigate]);

    return (
        <div className="flex min-h-screen bg-[#fafafb]">
            <div className="flex-shrink-0 w-[260px] bg-white border-r">
                <Sidebar />
            </div>
            <main className="flex-1">
                <Header />
                <div className="px-4 py-20">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
