import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import {
    HiUsers,
    HiBookOpen,
    HiChartBar,
    HiAcademicCap
} from 'react-icons/hi';

const Analytics = () => {
    const { user, hasRole } = useAuth();
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
    }, []);

    const fetchAnalytics = async () => {
        try {
            if (hasRole('admin')) {
                // Admin: fetch users, courses, and real enrollment stats
                const [usersRes, coursesRes, enrollmentStatsRes] = await Promise.all([
                    api.get('/auth/users'),
                    api.get('/courses'),
                    api.get('/enrollments/admin/stats')
                ]);
                const users = usersRes.data.data || [];
                const courses = coursesRes.data.data || [];
                const enrollmentStats = enrollmentStatsRes.data.data || { total: 0 };

                setStats({
                    totalUsers: users.length,
                    totalCourses: courses.length,
                    totalStudents: users.filter(u => u.role === 'student').length,
                    totalEnrollments: enrollmentStats.total,
                    avgRating: 0
                });
            } else if (hasRole('instructor')) {
                // Instructor: fetch their courses and students
                const [coursesRes, studentsRes] = await Promise.all([
                    api.get('/courses/instructor/my-courses'),
                    api.get('/enrollments/instructor/all-students')
                ]);
                const courses = coursesRes.data.data || [];
                const students = studentsRes.data.data || [];
                const ratings = courses.filter(c => c.rating > 0);
                const avgRating = ratings.length
                    ? (ratings.reduce((acc, c) => acc + c.rating, 0) / ratings.length).toFixed(1)
                    : 0;

                setStats({
                    totalCourses: courses.length,
                    totalStudents: students.length,
                    totalEnrollments: students.length, // Real enrollment count
                    avgRating
                });
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    // Simple bar chart data - would be real data in production
    const chartData = [
        { month: 'Jan', value: Math.round(stats.totalEnrollments * 0.6) || 0 },
        { month: 'Feb', value: Math.round(stats.totalEnrollments * 0.7) || 0 },
        { month: 'Mar', value: Math.round(stats.totalEnrollments * 0.8) || 0 },
        { month: 'Apr', value: Math.round(stats.totalEnrollments * 0.85) || 0 },
        { month: 'May', value: Math.round(stats.totalEnrollments * 0.95) || 0 },
        { month: 'Jun', value: stats.totalEnrollments || 0 }
    ];

    const maxValue = Math.max(...chartData.map(d => d.value), 1);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
                {/* Enrollments Chart */}
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
