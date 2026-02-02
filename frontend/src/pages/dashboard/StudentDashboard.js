import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import {
    HiBookOpen,
    HiClock,
    HiStar,
    HiPlay,
    HiCheckCircle,
    HiArrowRight,
    HiAcademicCap,
    HiTrendingUp
} from 'react-icons/hi';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        enrolled: 0,
        completed: 0,
        inProgress: 0,
        certificates: 0
    });
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await api.get('/enrollments/my');
            setEnrollments(res.data.data || []);

            // Calculate stats
            const enrolled = res.data.data?.length || 0;
            const completed = res.data.data?.filter(e => e.progress === 100).length || 0;

            setStats({
                enrolled,
                completed,
                inProgress: enrolled - completed,
                certificates: completed
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Enrolled Courses',
            value: stats.enrolled,
            icon: <HiBookOpen className="w-6 h-6" />,
            color: 'blue',
            bgColor: 'bg-blue-500'
        },
        {
            title: 'In Progress',
            value: stats.inProgress,
            icon: <HiClock className="w-6 h-6" />,
            color: 'yellow',
            bgColor: 'bg-yellow-500'
        },
        {
            title: 'Completed',
            value: stats.completed,
            icon: <HiCheckCircle className="w-6 h-6" />,
            color: 'green',
            bgColor: 'bg-green-500'
        },
        {
            title: 'Certificates',
            value: stats.certificates,
            icon: <HiAcademicCap className="w-6 h-6" />,
            color: 'purple',
            bgColor: 'bg-purple-500'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">
                            Welcome back, {user?.name?.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-blue-100">
                            Continue your learning journey. You have {stats.inProgress} course{stats.inProgress !== 1 ? 's' : ''} in progress.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                        >
                            Browse Courses
                            <HiArrowRight className="w-5 h-5" />
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
                        <p className="text-gray-500">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Continue Learning Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
                    <Link to="/dashboard/my-learning" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
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
                ) : enrollments.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <HiBookOpen className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
                        <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course.</p>
                        <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 btn-primary"
                        >
                            Browse Courses
                            <HiArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrollments.slice(0, 3).map((enrollment) => (
                            <div key={enrollment._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                                {/* Course Thumbnail */}
                                <div className="relative h-44 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                    {enrollment.course?.thumbnail ? (
                                        <img
                                            src={enrollment.course.thumbnail}
                                            alt={enrollment.course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <HiBookOpen className="w-16 h-16 text-white/30" />
                                    )}

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                                            <HiPlay className="w-6 h-6 text-blue-600 ml-1" />
                                        </div>
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="p-5">
                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                                        {enrollment.course?.title || 'Course Title'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        by {enrollment.course?.instructor?.name || 'Instructor'}
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-500">Progress</span>
                                            <span className="font-semibold text-blue-600">{enrollment.progress || 0}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                                                style={{ width: `${enrollment.progress || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/course/${enrollment.course?._id}/learn`}
                                        className="block w-full text-center py-2.5 bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white rounded-xl font-medium transition-colors"
                                    >
                                        Continue Learning
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <HiStar className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Featured Courses</h3>
                            <p className="text-yellow-100 text-sm">Explore our top-rated courses</p>
                        </div>
                    </div>
                    <Link
                        to="/courses?featured=true"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline"
                    >
                        Explore Now
                        <HiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <HiAcademicCap className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Your Certificates</h3>
                            <p className="text-green-100 text-sm">View your achievements</p>
                        </div>
                    </div>
                    <Link
                        to="/dashboard/certificates"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline"
                    >
                        View All
                        <HiArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
