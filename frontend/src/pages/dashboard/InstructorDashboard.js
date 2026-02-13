import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import {
    HiBookOpen,
    HiUsers,
    HiStar,
    HiPlus,
    HiArrowRight,
    HiEye,
    HiPencil,
    HiTrendingUp,
    HiClock,
    HiCheckCircle
} from 'react-icons/hi';

const InstructorDashboard = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        pendingApproval: 0,
        avgRating: 0
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await api.get('/courses/instructor/my-courses');
            setCourses(res.data.data || []);

            // Calculate stats
            const allCourses = res.data.data || [];
            const totalStudents = allCourses.reduce((acc, course) => acc + (course.enrolledCount || 0), 0);
            const pendingCourses = allCourses.filter(c => !c.isApproved);
            const ratings = allCourses.filter(c => c.averageRating > 0);
            const avgRating = ratings.length
                ? (ratings.reduce((acc, c) => acc + c.averageRating, 0) / ratings.length).toFixed(1)
                : 0;

            setStats({
                totalCourses: allCourses.length,
                totalStudents,
                pendingApproval: pendingCourses.length,
                avgRating
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Courses',
            value: stats.totalCourses,
            icon: <HiBookOpen className="w-6 h-6" />,
            bgColor: 'bg-blue-500',
            change: 'All courses'
        },
        {
            title: 'Total Students',
            value: stats.totalStudents,
            icon: <HiUsers className="w-6 h-6" />,
            bgColor: 'bg-green-500',
            change: 'Enrolled'
        },
        {
            title: 'Pending Approval',
            value: stats.pendingApproval,
            icon: <HiClock className="w-6 h-6" />,
            bgColor: 'bg-yellow-500',
            change: 'Awaiting review'
        },
        {
            title: 'Average Rating',
            value: stats.avgRating || '0.0',
            icon: <HiStar className="w-6 h-6" />,
            bgColor: 'bg-purple-500',
            change: 'From students'
        }
    ];

    const getStatusBadge = (course) => {
        if (course.isApproved) {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <HiCheckCircle className="w-3.5 h-3.5" />
                    Approved
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                <HiClock className="w-3.5 h-3.5" />
                Pending
            </span>
        );
    };

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">
                            Welcome back, {user?.name?.split(' ')[0]}! 🎓
                        </h1>
                        <p className="text-purple-100">
                            You have {stats.totalStudents} student{stats.totalStudents !== 1 ? 's' : ''} across {stats.totalCourses} course{stats.totalCourses !== 1 ? 's' : ''}.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <Link
                            to="/dashboard/create-course"
                            className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
                        >
                            <HiPlus className="w-5 h-5" />
                            Create Course
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center text-white`}>
                                {stat.icon}
                            </div>
                            <HiTrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                        <p className="text-xs text-blue-600 mt-2">{stat.change}</p>
                    </div>
                ))}
            </div>

            {/* My Courses Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                    <Link to="/dashboard/my-courses" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        View All
                        <HiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                                <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                ) : courses.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <HiBookOpen className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
                        <p className="text-gray-500 mb-6">Create your first course and start teaching!</p>
                        <Link
                            to="/dashboard/create-course"
                            className="inline-flex items-center gap-2 btn-primary"
                        >
                            <HiPlus className="w-5 h-5" />
                            Create Your First Course
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.slice(0, 6).map((course) => (
                            <div key={course._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                                {/* Course Thumbnail */}
                                <div className="relative h-44 bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <HiBookOpen className="w-16 h-16 text-white/30" />
                                    )}

                                    {/* Status Badge */}
                                    <div className="absolute top-3 right-3">
                                        {getStatusBadge(course)}
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="p-5">
                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                                        {course.title}
                                    </h3>

                                    {/* Stats Row */}
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <HiUsers className="w-4 h-4" />
                                            {course.enrolledCount || 0} students
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <HiStar className="w-4 h-4 text-yellow-400" />
                                            {course.averageRating?.toFixed(1) || '0.0'}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/course/${course._id}`}
                                            className="flex-1 text-center py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-1"
                                        >
                                            <HiEye className="w-4 h-4" />
                                            View
                                        </Link>
                                        <Link
                                            to={`/dashboard/course/${course._id}/edit`}
                                            className="flex-1 text-center py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-1"
                                        >
                                            <HiPencil className="w-4 h-4" />
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <HiUsers className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Students</h3>
                            <p className="text-orange-100 text-sm">Manage your students</p>
                        </div>
                    </div>
                    <Link
                        to="/dashboard/students"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline"
                    >
                        View Students
                        <HiArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
