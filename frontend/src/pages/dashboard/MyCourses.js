import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
    HiBookOpen,
    HiPlus,
    HiPencil,
    HiTrash,
    HiEye,
    HiUsers,
    HiStar,
    HiClock,
    HiCheckCircle,
    HiXCircle,
    HiSearch,
    HiChevronDown
} from 'react-icons/hi';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get('/courses/instructor/my-courses');
            setCourses(res.data.data || []);
        } catch (error) {
            console.error('Error fetching courses:', error);
            toast.error('Failed to load courses');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            return;
        }

        setDeletingId(courseId);
        try {
            await api.delete(`/courses/${courseId}`);
            toast.success('Course deleted successfully');
            setCourses(prev => prev.filter(c => c._id !== courseId));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete course');
        } finally {
            setDeletingId(null);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase());

        if (filter === 'all') return matchesSearch;
        if (filter === 'approved') return matchesSearch && course.status === 'approved';
        if (filter === 'pending') return matchesSearch && course.status === 'pending';
        if (filter === 'rejected') return matchesSearch && course.status === 'rejected';
        return matchesSearch;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <HiCheckCircle className="w-3.5 h-3.5" />
                        Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <HiXCircle className="w-3.5 h-3.5" />
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <HiClock className="w-3.5 h-3.5" />
                        Pending Review
                    </span>
                );
        }
    };

    const stats = {
        total: courses.length,
        approved: courses.filter(c => c.status === 'approved').length,
        pending: courses.filter(c => c.status === 'pending').length,
        students: courses.reduce((acc, c) => acc + (c.enrolledCount || 0), 0)
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">My Courses</h1>
                    <p className="text-gray-500">Manage and track your courses</p>
                </div>
                <Link
                    to="/dashboard/create-course"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                    <HiPlus className="w-5 h-5" />
                    Create Course
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-sm text-gray-500">Total Courses</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                    <p className="text-sm text-gray-500">Approved</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    <p className="text-sm text-gray-500">Pending</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-blue-600">{stats.students}</p>
                    <p className="text-sm text-gray-500">Total Students</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
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
                        <option value="all">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Course Grid */}
            {filteredCourses.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiBookOpen className="w-8 h-8 text-purple-600" />
                    </div>
                    {courses.length === 0 ? (
                        <>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
                            <p className="text-gray-500 mb-6">Create your first course and start teaching!</p>
                            <Link to="/dashboard/create-course" className="btn-primary inline-flex items-center gap-2">
                                <HiPlus className="w-5 h-5" />
                                Create Your First Course
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
                    {filteredCourses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                        >
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
                                    {getStatusBadge(course.status)}
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className="p-5">
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
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

                                {/* Rejection Reason */}
                                {course.status === 'rejected' && course.rejectionReason && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                                        <p className="text-xs text-red-600">
                                            <strong>Rejection reason:</strong> {course.rejectionReason}
                                        </p>
                                    </div>
                                )}

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
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        disabled={deletingId === course._id}
                                        className="p-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-colors disabled:opacity-50"
                                    >
                                        {deletingId === course._id ? (
                                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <HiTrash className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCourses;
