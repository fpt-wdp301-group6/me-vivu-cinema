import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useAuth } from '~/hooks';

const AuthLayout = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !isLoading) {
            navigate(config.routes.cinema);
        }
    }, [user, isLoading, navigate]);

    return (
        <div className="flex h-screen">
            <div className="w-1/3 max-md:hidden">
                <video className="object-cover h-full" src="/videos/animation.mp4" playsInline autoPlay loop muted />
            </div>
            <div className="flex items-center justify-center flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
