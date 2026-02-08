import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
    HiBookOpen,
    HiCheck,
    HiX,
    HiEye,
    HiClock,
    HiCheckCircle,
    HiUser
} from 'react-icons/hi';

const AdminApprovals = () => {
    const [pendingCourses, setPendingCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        fetchPendingCourses();
    }, []);

    const fetchPendingCourses = async () => {
        try {
            const res = await api.get('/courses/admin/pending');
            setPendingCourses(res.data.data || []);
        } catch (error) {
            console.error('Error fetching pending courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (courseId) => {
        setProcessingId(courseId);
        try {
            await api.patch(`/courses/${courseId}/approve`);
            toast.success('Course approved successfully!');
            setPendingCourses(prev => prev.filter(c => c._id !== courseId));
        } catch (error) {
            toast.error('Failed to approve course');
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (courseId) => {
        const reason = prompt('Enter rejection reason:');
        if (!reason) return;

        setProcessingId(courseId);
        try {
            await api.patch(`/courses/${courseId}/reject`, { reason });
            toast.success('Course rejected');
            setPendingCourses(prev => prev.filter(c => c._id !== courseId));
        } catch (error) {
            toast.error('Failed to reject course');
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </div>
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
                <h1 className="text-2xl font-bold text-gray-900">Course Approvals</h1>
                <p className="text-gray-500">Review and approve pending courses</p>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <HiClock className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-3xl font-bold">{pendingCourses.length}</p>
                        <p className="text-yellow-100">Courses awaiting review</p>
                    </div>
                </div>
            </div>

            {/* Pending Courses */}
            {pendingCourses.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiCheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-500">No courses pending approval.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {pendingCourses.map((course) => (
                        <div key={course._id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                {/* Thumbnail */}
                                <div className="w-full md:w-32 h-32 md:h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        <HiBookOpen className="w-10 h-10 text-white/50" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{course.description}</p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <HiUser className="w-4 h-4" />
                                            {course.instructor?.name || 'Unknown'}
                                        </span>
                                        <span className="capitalize">{course.level}</span>
                                        <span>{course.category}</span>
                                        <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/course/${course._id}`}
                                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                                        title="Preview"
                                    >
                                        <HiEye className="w-5 h-5 text-gray-600" />
                                    </Link>
                                    <button
                                        onClick={() => handleApprove(course._id)}
                                        disabled={processingId === course._id}
                                        className="p-3 bg-green-100 hover:bg-green-200 rounded-xl transition-colors disabled:opacity-50"
                                        title="Approve"
                                    >
                                        {processingId === course._id ? (
                                            <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <HiCheck className="w-5 h-5 text-green-600" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleReject(course._id)}
                                        disabled={processingId === course._id}
                                        className="p-3 bg-red-100 hover:bg-red-200 rounded-xl transition-colors disabled:opacity-50"
                                        title="Reject"
                                    >
                                        <HiX className="w-5 h-5 text-red-600" />
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

export default AdminApprovals;
