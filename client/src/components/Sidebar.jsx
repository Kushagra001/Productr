import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'text-white' : 'text-[#8B8D97] hover:text-white';
    };

    return (
        <div className="w-[240px] h-screen bg-[#1C1D21] flex flex-col fixed left-0 top-0 border-r border-[#2C2D33] z-40">
            {/* Logo Section */}
            <div className="p-6 mb-2 flex flex-row items-center gap-[8px]">
                <span
                    style={{
                        fontFamily: 'AvertaStd-Black, sans-serif',
                        fontSize: '24px',
                        lineHeight: '30px',
                        fontWeight: 400,
                        color: '#FFFFFF'
                    }}
                >
                    Productr
                </span>
                <img src="/logo_icon.png" alt="Productr Icon" className="w-[26.66px] h-[26.64px]" />
            </div>

            {/* Search Bar - Inside Sidebar as per new design */}
            <div className="px-4 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#2C2D33] text-gray-300 text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder-gray-500"
                    />
                    <svg className="absolute left-3 top-3 text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
            </div>

            {/* Navigation */}
            <div className="px-4 flex flex-col gap-1">
                <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive('/')}`}>
                    {/* Home Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span className="text-[14px] font-medium">Home</span>
                </Link>

                <Link to="/products" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive('/products')}`}>
                    {/* Products (Bag) Icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    <span className="text-[14px] font-medium">Products</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
