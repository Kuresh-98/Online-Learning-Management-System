import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on app load
    useEffect(() => {
        const initAuth = async () => {
            const savedToken = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    // Google login state updater
    const googleLogin = () => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });

            if (response.data.success) {
                const { token, ...userData } = response.data.data;

                // Save to localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                // Update state
                setToken(token);
                setUser(userData);

                return { success: true, user: userData };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    // Register function
    const register = async (name, email, password, role = 'student') => {
        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password,
                role
            });

            if (response.data.success) {
                const { token, ...userData } = response.data.data;

                // Save to localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                // Update state
                setToken(token);
                setUser(userData);

                return { success: true, user: userData };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    // Check if user has specific role
    const hasRole = (roles) => {
        if (!user) return false;
        if (typeof roles === 'string') return user.role === roles;
        return roles.includes(user.role);
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        hasRole,
        googleLogin,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
