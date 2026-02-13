import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { HiSearch, HiMenuAlt2 } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="lg:ml-64 transition-all duration-300">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* Left Side */}
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <HiMenuAlt2 className="w-5 h-5 text-gray-500" />
                            </button>

                            {/* Search Bar */}
                            <div className="relative hidden md:block">
                                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search courses, lessons..."
                                    className="pl-12 pr-4 py-2.5 w-80 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-4">
                            {/* Notifications removed */}

                            {/* User Info */}
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-semibold text-gray-900">
                                        {user?.name || 'User'}
                                    </div>
                                    <div className="text-xs text-gray-500 capitalize">
                                        {user?.role || 'Student'}
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
