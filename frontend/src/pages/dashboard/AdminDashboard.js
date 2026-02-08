import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
    HiBookOpen,
    HiUsers,
    HiAcademicCap,
    HiShieldCheck,
    HiArrowRight,
    HiCheck,
    HiX,
    HiTrendingUp,
    HiChartBar,
    HiClock,
    HiCheckCircle,
    HiEye,
    HiDocumentText,
    HiUserGroup
} from 'react-icons/hi';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [pendingCourses, setPendingCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        pendingApprovals: 0,
        totalEnrollments: 0
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch pending courses
            const coursesRes = await api.get('/courses/admin/pending');
            setPendingCourses(coursesRes.data.data || []);

            // In a real app, you'd have an admin stats endpoint
            setStats({
                totalUsers: 156,
                totalCourses: 48,
                pendingApprovals: coursesRes.data.data?.length || 0,
                totalEnrollments: 892
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (courseId) => {
        try {
            await api.patch(`/courses/${courseId}/approve`);
            toast.success('Course approved successfully!');
            setPendingCourses(prev => prev.filter(c => c._id !== courseId));
            setStats(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
        } catch (error) {
            toast.error('Failed to approve course');
        }
    };

    const handleReject = async (courseId) => {
        try {
            await api.delete(`/courses/${courseId}`);
            toast.success('Course rejected and removed');
            setPendingCourses(prev => prev.filter(c => c._id !== courseId));
            setStats(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
        } catch (error) {
            toast.error('Failed to reject course');
        }
    };

    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: <HiUsers className="w-6 h-6" />,
            bgColor: 'bg-blue-500',
            link: '/dashboard/users'
        },
        {
            title: 'Total Courses',
            value: stats.totalCourses,
            icon: <HiBookOpen className="w-6 h-6" />,
            bgColor: 'bg-green-500',
            link: '/dashboard/courses'
        },
        {
            title: 'Pending Approvals',
            value: stats.pendingApprovals,
            icon: <HiClock className="w-6 h-6" />,
            bgColor: 'bg-yellow-500',
            link: '/dashboard/approvals'
        },
        {
            title: 'Total Enrollments',
            value: stats.totalEnrollments,
            icon: <HiAcademicCap className="w-6 h-6" />,
            bgColor: 'bg-purple-500',
            link: '/dashboard/analytics'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <HiShieldCheck className="w-6 h-6" />
                            <span className="text-sm font-medium text-red-100">Admin Panel</span>
                        </div>
                        <h1 className="text-2xl font-bold mb-2">
                            Welcome back, {user?.name?.split(' ')[0]}! 👑
                        </h1>
                        <p className="text-red-100">
                            You have {stats.pendingApprovals} course{stats.pendingApprovals !== 1 ? 's' : ''} waiting for approval.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <Link
                            to="/dashboard/approvals"
                            className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors"
                        >
                            Review Pending
                            <HiArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <Link
                        key={index}
                        to={stat.link}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center text-white`}>
                                {stat.icon}
                            </div>
                            <HiArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-500">{stat.title}</p>
                    </Link>
                ))}
            </div>

            {/* Pending Approvals Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Pending Course Approvals</h2>
                    <Link to="/dashboard/approvals" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        View All
                        <HiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="divide-y divide-gray-100">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-6 animate-pulse">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : pendingCourses.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <HiCheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">All caught up!</h3>
                        <p className="text-gray-500">No courses pending approval.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="divide-y divide-gray-100">
                            {pendingCourses.slice(0, 5).map((course) => (
                                <div key={course._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-6">
                                        {/* Course Thumbnail */}
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            {course.thumbnail ? (
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            ) : (
                                                <HiBookOpen className="w-8 h-8 text-white/50" />
                                            )}
                                        </div>

                                        {/* Course Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 truncate">{course.title}</h3>
                                            <p className="text-sm text-gray-500 mb-1">
                                                by {course.instructor?.name || 'Unknown Instructor'}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <HiClock className="w-4 h-4" />
                                                    {new Date(course.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="capitalize">{course.level}</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/course/${course._id}`}
                                                className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                                                title="View Course"
                                            >
                                                <HiEye className="w-5 h-5 text-gray-600" />
                                            </Link>
                                            <button
                                                onClick={() => handleApprove(course._id)}
                                                className="p-2.5 bg-green-100 hover:bg-green-200 rounded-xl transition-colors"
                                                title="Approve"
                                            >
                                                <HiCheck className="w-5 h-5 text-green-600" />
                                            </button>
                                            <button
                                                onClick={() => handleReject(course._id)}
                                                className="p-2.5 bg-red-100 hover:bg-red-200 rounded-xl transition-colors"
                                                title="Reject"
                                            >
                                                <HiX className="w-5 h-5 text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    to="/dashboard/users"
                    className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <HiUserGroup className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Manage Users</h3>
                            <p className="text-blue-100 text-sm">View and manage all users</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm font-medium">
                        Go to Users
                        <HiArrowRight className="w-4 h-4" />
                    </div>
                </Link>

                <Link
                    to="/dashboard/analytics"
                    className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <HiChartBar className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Analytics</h3>
                            <p className="text-purple-100 text-sm">View platform analytics</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm font-medium">
                        View Analytics
                        <HiArrowRight className="w-4 h-4" />
                    </div>
                </Link>

                <Link
                    to="/dashboard/reports"
                    className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <HiDocumentText className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Reports</h3>
                            <p className="text-orange-100 text-sm">Generate and view reports</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm font-medium">
                        View Reports
                        <HiArrowRight className="w-4 h-4" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
