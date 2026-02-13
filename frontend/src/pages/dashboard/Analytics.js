import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import {
    HiUsers,
    HiBookOpen,
    HiChartBar,
    HiAcademicCap
} from 'react-icons/hi';
const AdminEnrollmentsList = React.lazy(() => import('./AdminEnrollmentsList'));

const Analytics = () => {
    const { hasRole } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        totalStudents: 0,
        totalEnrollments: 0,
        avgRating: 0
    });

    useEffect(() => {
        fetchAnalytics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAnalytics = async () => {
        try {
            if (hasRole('admin')) {
                // Admin: attempt to fetch users, courses and enrollments
                const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
                    api.get('/auth/users'),
                    api.get('/courses'),
                    api.get('/enrollments/admin/all')
                ]);

                const totalUsers = Array.isArray(usersRes?.data) ? usersRes.data.length : (usersRes?.data?.length || 0);
                const totalCourses = Array.isArray(coursesRes?.data) ? coursesRes.data.length : (coursesRes?.data?.length || 0);
                const totalEnrollments = Array.isArray(enrollmentsRes?.data) ? enrollmentsRes.data.length : (enrollmentsRes?.data?.length || 0);
                const totalStudents = totalUsers; // crude approximation

                setStats({
                    totalUsers,
                    totalCourses,
                    totalStudents,
                    totalEnrollments,
                    avgRating: 0
                });
            } else {
                // Non-admin: fetch public counts (best-effort)
                const [coursesRes, enrollmentsRes] = await Promise.all([
                    api.get('/courses'),
                    api.get('/enrollments')
                ]);

                const totalCourses = Array.isArray(coursesRes?.data) ? coursesRes.data.length : 0;
                const totalEnrollments = Array.isArray(enrollmentsRes?.data) ? enrollmentsRes.data.length : 0;

                setStats(prev => ({ ...prev, totalCourses, totalEnrollments }));
            }
        } catch (err) {
            // swallow errors for now and keep defaults
            // console.error('Failed to fetch analytics', err);
        } finally {
            setLoading(false);
        }
    };

    // Simple chart data fallback using totalEnrollments split across 6 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const perMonth = Math.max(Math.round((stats.totalEnrollments || 0) / months.length), 1);
    const chartData = months.map((m, i) => ({ month: m, value: perMonth * (i + 1) }));
    const maxValue = Math.max(...chartData.map(c => c.value), 1);

    return (
        <div className="space-y-6">
        {/* Header */}
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-500">Track your platform performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hasRole('admin') ? (
                <>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <HiUsers className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                        <p className="text-gray-500 text-sm">Total Users</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <HiBookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
                        <p className="text-gray-500 text-sm">Total Courses</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <HiAcademicCap className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalEnrollments}</p>
                        <p className="text-gray-500 text-sm">Total Enrollments</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <HiChartBar className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                        <p className="text-gray-500 text-sm">Total Students</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <HiUsers className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                        <p className="text-gray-500 text-sm">Total Students</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <HiBookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
                        <p className="text-gray-500 text-sm">My Courses</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <HiAcademicCap className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalEnrollments}</p>
                        <p className="text-gray-500 text-sm">Enrollments</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <HiChartBar className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.avgRating || '0.0'}</p>
                        <p className="text-gray-500 text-sm">Average Rating</p>
                    </div>
                </>
            )}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enrollments Chart or Admin Enrollments List */}
            {hasRole('admin') ? (
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Enrollments</h3>
                    <Suspense fallback={<div>Loading enrollments...</div>}>
                        <AdminEnrollmentsList />
                    </Suspense>
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Enrollment Trends</h3>
                    <div className="flex items-end justify-between h-48 gap-4">
                        {chartData.map((item, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all hover:opacity-80"
                                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                                ></div>
                                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Top Metrics */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Key Metrics</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <HiBookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Total Courses</p>
                                <p className="text-sm text-gray-500">Published courses</p>
                            </div>
                        </div>
                        <p className="text-xl font-bold text-gray-900">{stats.totalCourses}</p>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <HiUsers className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Students</p>
                                <p className="text-sm text-gray-500">{hasRole('admin') ? 'Registered students' : 'Your students'}</p>
                            </div>
                        </div>
                        <p className="text-xl font-bold text-gray-900">{stats.totalStudents}</p>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <HiAcademicCap className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Enrollments</p>
                                <p className="text-sm text-gray-500">Total course enrollments</p>
                            </div>
                        </div>
                        <p className="text-xl font-bold text-gray-900">{stats.totalEnrollments}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Analytics;
