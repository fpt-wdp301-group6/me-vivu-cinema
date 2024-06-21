import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
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
