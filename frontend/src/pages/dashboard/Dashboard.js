import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const { hasRole } = useAuth();

    // Render appropriate dashboard based on user role
    if (hasRole('admin')) {
        return <AdminDashboard />;
    }

    if (hasRole('instructor')) {
        return <InstructorDashboard />;
    }

    // Default to student dashboard
    return <StudentDashboard />;
};

export default Dashboard;
