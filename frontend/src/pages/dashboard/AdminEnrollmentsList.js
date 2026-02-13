import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const AdminEnrollmentsList = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const res = await api.get('/enrollments/admin/all');
            // Helpful logging for debugging
            console.debug('Enrollments response:', res.status, res.data);
            setEnrollments(res.data.data || []);
        } catch (err) {
            console.error('Fetch enrollments error:', err, err.response?.data || err.message);
            const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to load enrollments';
            toast.error(message);
            setEnrollments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const ok = window.confirm('Delete this enrollment?');
            if (!ok) return;
            await api.delete(`/enrollments/admin/${id}`);
            toast.success('Enrollment deleted');
            // Remove by id (backend returns `id` in list)
            setEnrollments(prev => prev.filter(e => (e.id || e._id) !== id));
        } catch (err) {
            console.error('Delete enrollment error:', err, err.response?.data || err.message);
            const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to delete enrollment';
            toast.error(message);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (enrollments.length === 0) return <div className="text-gray-500">No enrollments found.</div>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Student</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Course</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Enrolled</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {enrollments.map(e => (
                        <tr key={e.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">{e.studentName}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{e.studentEmail}</td>
                            <td className="px-4 py-3">{e.courseTitle}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{new Date(e.enrolledAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-right">
                                <button onClick={() => handleDelete(e.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminEnrollmentsList;
