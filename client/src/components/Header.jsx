import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Get user from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const email = user.email || 'Guest';
    // Derive username from email (e.g. john.doe@email.com -> John.doe)
    const username = email !== 'Guest' ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) : 'Guest user';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="h-16 bg-white border-b border-[#E4E7EC] px-8 flex items-center justify-between sticky top-0 z-10">
            {/* Title / Breadcrumbs */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                {/* Optional: Add breadcrumb logic if needed, or just keep title */}
            </div>

            <div className="flex items-center gap-4 relative">
                {/* User Dropdown */}
                <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} alt="User" />
                    </div>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-14 right-0 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                        {/* User Email/Info (Optional) */}
                        <div className="px-4 py-2 border-b border-gray-50">
                            <p className="text-sm font-medium text-gray-900 truncate" title={username}>{username}</p>
                            <p className="text-xs text-gray-500 truncate" title={email}>{email}</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
