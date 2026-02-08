import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import {
    HiBookOpen,
    HiPlay,
    HiClock,
    HiCheckCircle,
    HiSearch,
    HiChevronDown
} from 'react-icons/hi';

const MyLearning = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const res = await api.get('/enrollments/my-courses');
            setEnrollments(res.data.data || []);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEnrollments = enrollments.filter(enrollment => {
        const matchesSearch = enrollment.course?.title?.toLowerCase().includes(searchQuery.toLowerCase());

        if (filter === 'all') return matchesSearch;
        if (filter === 'in-progress') return matchesSearch && enrollment.progress < 100;
        if (filter === 'completed') return matchesSearch && enrollment.progress === 100;
        return matchesSearch;
    });

    const stats = {
        total: enrollments.length,
        inProgress: enrollments.filter(e => e.progress < 100).length,
        completed: enrollments.filter(e => e.progress === 100).length
    };

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                            <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Learning</h1>
                <p className="text-gray-500">Track your progress and continue learning</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <HiBookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            <p className="text-sm text-gray-500">Total Courses</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <HiClock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                            <p className="text-sm text-gray-500">In Progress</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <HiCheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                            <p className="text-sm text-gray-500">Completed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search your courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="relative">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer"
                    >
                        <option value="all">All Courses</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Course Grid */}
            {filteredEnrollments.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiBookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    {enrollments.length === 0 ? (
                        <>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
                            <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course.</p>
                            <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
                                Browse Courses
                            </Link>
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter.</p>
                        </>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEnrollments.map((enrollment) => (
                        <div
                            key={enrollment._id}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
                        >
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

                                {/* Progress Badge */}
                                <div className="absolute top-3 right-3">
                                    {enrollment.progress === 100 ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            <HiCheckCircle className="w-3.5 h-3.5" />
                                            Completed
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                            <HiClock className="w-3.5 h-3.5" />
                                            In Progress
                                        </span>
                                    )}
                                </div>

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                                        <HiPlay className="w-6 h-6 text-blue-600 ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className="p-5">
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
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
                                            className={`h-2 rounded-full transition-all ${enrollment.progress === 100
                                                ? 'bg-green-500'
                                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                                }`}
                                            style={{ width: `${enrollment.progress || 0}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <Link
                                    to={`/course/${enrollment.course?._id}`}
                                    className="block w-full text-center py-2.5 bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white rounded-xl font-medium transition-colors"
                                >
                                    {enrollment.progress === 100 ? 'Review Course' : 'Continue Learning'}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyLearning;
