import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Loading spinner component
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading...</p>
        </div>
    </div>
);

// Protected Route - Requires authentication
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    // Show loading while checking auth status
    if (loading) {
        return <LoadingSpinner />;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role-based access if roles are specified
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        // Redirect to dashboard if user doesn't have required role
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// Public Route - Only accessible when NOT authenticated
export const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Show loading while checking auth status
    if (loading) {
        return <LoadingSpinner />;
    }

    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/dashboard';
        return <Navigate to={from} replace />;
    }

    return children;
};

export default ProtectedRoute;
