import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    HiAcademicCap,
    HiViewGrid,
    HiBookOpen,
    HiUsers,
    HiCog,
    HiLogout,
    HiChevronLeft,
    HiChevronRight,
    HiPlusCircle,
    HiClipboardList,
    HiChatAlt,
    HiChartBar,
    HiUserGroup,
    HiShieldCheck,
    HiDocumentText,
    HiStar
} from 'react-icons/hi';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user, logout, hasRole } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Define menu items based on user role
    const getMenuItems = () => {
        const commonItems = [
            {
                name: 'Dashboard',
                path: '/dashboard',
                icon: <HiViewGrid className="w-5 h-5" />
            }
        ];

        if (hasRole('admin')) {
            return [
                ...commonItems,
                {
                    name: 'All Users',
                    path: '/dashboard/users',
                    icon: <HiUsers className="w-5 h-5" />
                },
                {
                    name: 'All Courses',
                    path: '/dashboard/courses',
                    icon: <HiBookOpen className="w-5 h-5" />
                },
                {
                    name: 'Approvals',
                    path: '/dashboard/approvals',
                    icon: <HiShieldCheck className="w-5 h-5" />
                },
                {
                    name: 'Analytics',
                    path: '/dashboard/analytics',
                    icon: <HiChartBar className="w-5 h-5" />
                },
                {
                    name: 'Reports',
                    path: '/dashboard/reports',
                    icon: <HiDocumentText className="w-5 h-5" />
                }
            ];
        }

        if (hasRole('instructor')) {
            return [
                ...commonItems,
                {
                    name: 'My Courses',
                    path: '/dashboard/my-courses',
                    icon: <HiBookOpen className="w-5 h-5" />
                },
                {
                    name: 'Create Course',
                    path: '/dashboard/create-course',
                    icon: <HiPlusCircle className="w-5 h-5" />
                },
                {
                    name: 'Students',
                    path: '/dashboard/students',
                    icon: <HiUserGroup className="w-5 h-5" />
                },
                {
                    name: 'Analytics',
                    path: '/dashboard/analytics',
                    icon: <HiChartBar className="w-5 h-5" />
                },
                {
                    name: 'Messages',
                    path: '/dashboard/messages',
                    icon: <HiChatAlt className="w-5 h-5" />
                }
            ];
        }

        // Student menu
        return [
            ...commonItems,
            {
                name: 'My Learning',
                path: '/dashboard/my-learning',
                icon: <HiClipboardList className="w-5 h-5" />
            },
            {
                name: 'Browse Courses',
                path: '/courses',
                icon: <HiBookOpen className="w-5 h-5" />
            },
            {
                name: 'My Reviews',
                path: '/dashboard/reviews',
                icon: <HiStar className="w-5 h-5" />
            },
            {
                name: 'Messages',
                path: '/dashboard/messages',
                icon: <HiChatAlt className="w-5 h-5" />
            }
        ];
    };

    const menuItems = getMenuItems();

    const getRoleBadge = () => {
        const colors = {
            admin: 'bg-red-100 text-red-700 border-red-200',
            instructor: 'bg-purple-100 text-purple-700 border-purple-200',
            student: 'bg-blue-100 text-blue-700 border-blue-200'
        };
        return colors[user?.role] || colors.student;
    };

    return (
        <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'
            }`}>
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Link to="/" className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <HiAcademicCap className="w-6 h-6 text-white" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold text-gray-900">LearnHub</span>
                    )}
                </Link>
            </div>

            {/* User Profile */}
            <div className={`p-4 border-b border-gray-100 ${isCollapsed ? 'text-center' : ''}`}>
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{user?.name || 'User'}</h4>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize border ${getRoleBadge()}`}>
                                {user?.role || 'student'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    } ${isCollapsed ? 'justify-center' : ''}`}
                                title={isCollapsed ? item.name : ''}
                            >
                                <span className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className="font-medium">{item.name}</span>
                                )}
                                {isActive && !isCollapsed && (
                                    <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-100 space-y-2">
                <Link
                    to="/dashboard/settings"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors ${isCollapsed ? 'justify-center' : ''
                        }`}
                    title={isCollapsed ? 'Settings' : ''}
                >
                    <HiCog className="w-5 h-5 text-gray-400" />
                    {!isCollapsed && <span className="font-medium">Settings</span>}
                </Link>

                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full ${isCollapsed ? 'justify-center' : ''
                        }`}
                    title={isCollapsed ? 'Sign Out' : ''}
                >
                    <HiLogout className="w-5 h-5" />
                    {!isCollapsed && <span className="font-medium">Sign Out</span>}
                </button>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
            >
                {isCollapsed ? (
                    <HiChevronRight className="w-4 h-4" />
                ) : (
                    <HiChevronLeft className="w-4 h-4" />
                )}
            </button>
        </aside>
    );
};

export default Sidebar;
