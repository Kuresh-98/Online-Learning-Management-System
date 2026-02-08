import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    HiTrendingUp,
    HiUsers,
    HiBookOpen,
    HiCurrencyDollar,
    HiChartBar,
    HiEye,
    HiAcademicCap,
    HiClock
} from 'react-icons/hi';

const Analytics = () => {
    const { user, hasRole } = useAuth();

    // Sample analytics data
    const stats = hasRole('admin') ? {
        totalUsers: 156,
        totalCourses: 48,
        totalEnrollments: 892,
        monthlyGrowth: 12.5
    } : {
        totalStudents: 342,
        totalCourses: 8,
        totalEnrollments: 156,
        avgRating: 4.6
    };

    const chartData = [
        { month: 'Jan', value: 65 },
        { month: 'Feb', value: 78 },
        { month: 'Mar', value: 92 },
        { month: 'Apr', value: 110 },
        { month: 'May', value: 125 },
        { month: 'Jun', value: 148 }
    ];

    const maxValue = Math.max(...chartData.map(d => d.value));

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
                                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                                    <HiTrendingUp className="w-4 h-4" />
                                    +12%
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                            <p className="text-gray-500 text-sm">Total Users</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <HiBookOpen className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                                    <HiTrendingUp className="w-4 h-4" />
                                    +8%
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
                            <p className="text-gray-500 text-sm">Total Courses</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <HiAcademicCap className="w-6 h-6 text-green-600" />
                                </div>
                                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                                    <HiTrendingUp className="w-4 h-4" />
                                    +15%
                                </span>
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
                            <p className="text-3xl font-bold text-gray-900">{stats.monthlyGrowth}%</p>
                            <p className="text-gray-500 text-sm">Monthly Growth</p>
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
                            <p className="text-3xl font-bold text-gray-900">{stats.avgRating}</p>
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
                                    <HiEye className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Page Views</p>
                                    <p className="text-sm text-gray-500">Last 30 days</p>
                                </div>
                            </div>
                            <p className="text-xl font-bold text-gray-900">12.4K</p>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <HiClock className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Avg. Session</p>
                                    <p className="text-sm text-gray-500">Time on platform</p>
                                </div>
                            </div>
                            <p className="text-xl font-bold text-gray-900">18m</p>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <HiTrendingUp className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Completion Rate</p>
                                    <p className="text-sm text-gray-500">Course completions</p>
                                </div>
                            </div>
                            <p className="text-xl font-bold text-gray-900">67%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
