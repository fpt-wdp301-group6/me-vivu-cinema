import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#fafafb]">
            <div className="flex-shrink-0 w-[260px] border-r">
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
