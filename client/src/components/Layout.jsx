import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex bg-[#F7F8FA] min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-[240px]">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
