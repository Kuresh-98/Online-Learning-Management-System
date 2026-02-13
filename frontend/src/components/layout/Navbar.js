import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    HiAcademicCap,
    HiMenu,
    HiX,
    HiChevronDown,
    HiLogout,
    HiViewGrid
} from 'react-icons/hi';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Check if we're on auth pages
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.profile-dropdown')) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsProfileDropdownOpen(false);
    };

    // Don't show navbar on auth pages
    if (isAuthPage) return null;

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    const getRoleBadgeColor = () => {
        switch (user?.role) {
            case 'admin':
                return 'bg-red-100 text-red-700';
            case 'instructor':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <HiAcademicCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">
                            Learnify
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-medium transition-colors hover:text-white ${location.pathname === link.path
                                    ? 'text-white'
                                    : 'text-blue-100'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side - Auth Buttons or User Menu */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="relative profile-dropdown">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all"
                                >
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-medium">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <div className="text-sm font-semibold text-white">
                                            {user?.name?.split(' ')[0] || 'User'}
                                        </div>
                                        <div className="text-xs capitalize text-blue-100">
                                            {user?.role}
                                        </div>
                                    </div>
                                    <HiChevronDown className={`w-4 h-4 text-blue-100 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 animate-fade-in">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <div className="font-semibold text-gray-900">{user?.name}</div>
                                            <div className="text-sm text-gray-500">{user?.email}</div>
                                            <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor()}`}>
                                                {user?.role}
                                            </span>
                                        </div>

                                        <div className="py-2">
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <HiViewGrid className="w-5 h-5 text-gray-400" />
                                                Dashboard
                                            </Link>
                                        </div>

                                        <div className="pt-2 border-t border-gray-100">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <HiLogout className="w-5 h-5" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="hidden sm:block font-medium px-4 py-2 rounded-xl text-blue-100 hover:text-white transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="font-medium px-5 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 transition-all"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-xl text-white hover:bg-white/20 transition-colors"
                        >
                            {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t shadow-lg animate-fade-in">
                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === link.path
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {!isAuthenticated && (
                            <div className="pt-4 space-y-2 border-t">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-center font-medium text-gray-600 hover:bg-gray-50 rounded-xl"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-center font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                                >
                                    Get Started Free
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
