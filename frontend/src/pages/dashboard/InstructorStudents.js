import React, { useState, useEffect } from 'react';
import { HiSearch, HiAcademicCap, HiClock, HiCheckCircle, HiMail, HiChartBar } from 'react-icons/hi';
import api from '../../utils/api';

const InstructorStudents = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            // Fetch instructor's courses
            const coursesRes = await api.get('/courses/instructor/my-courses');
            const coursesData = coursesRes.data.data || [];
            setCourses(coursesData);

            // Fetch real students from API
            const studentsRes = await api.get('/enrollments/instructor/all-students');
            const studentsData = studentsRes.data.data || [];

            // Format the data for display
            const formattedStudents = studentsData.map(student => ({
                id: student.id,
                name: student.name,
                email: student.email,
                profilePicture: student.profilePicture,
                courseId: student.courseId,
                courseName: student.courseName,
                progress: student.progress || 0,
                enrolledDate: student.enrolledDate,
                lastActive: formatTimeAgo(student.lastActive),
                status: student.status
            }));

            setStudents(formattedStudents);
        } catch (error) {
            console.error('Error fetching data:', error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    // Format date to "X time ago"
    const formatTimeAgo = (date) => {
        if (!date) return 'Never';
        const now = new Date();
        const past = new Date(date);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return past.toLocaleDateString();
    };

    const filteredStudents = students.filter(student => {
        const matchesCourse = selectedCourse === 'all' || student.courseId === selectedCourse;
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCourse && matchesSearch;
    });

    const stats = {
        total: students.length,
        completed: students.filter(s => s.progress === 100).length,
        active: students.filter(s => s.progress > 0 && s.progress < 100).length,
        avgProgress: Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length) || 0
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
                <p className="text-gray-500">Track student progress across your courses</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <HiAcademicCap className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-sm text-gray-500">Total Students</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <HiCheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                    <p className="text-sm text-gray-500">Completed</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <HiClock className="w-5 h-5 text-yellow-600" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                    <p className="text-sm text-gray-500">In Progress</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <HiChartBar className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
                    <p className="text-sm text-gray-500">Avg. Progress</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                    <option value="all">All Courses</option>
                    {courses.map((course) => (
                        <option key={course._id} value={course._id}>{course.title}</option>
                    ))}
                </select>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Student</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Course</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Progress</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Last Active</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{student.name}</p>
                                                <p className="text-sm text-gray-500">{student.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-gray-700">{student.courseName}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="w-32">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-sm font-medium ${student.progress === 100 ? 'text-green-600' :
                                                    student.progress > 50 ? 'text-blue-600' : 'text-yellow-600'
                                                    }`}>
                                                    {student.progress}%
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${student.progress === 100 ? 'bg-green-500' :
                                                        student.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                                                        }`}
                                                    style={{ width: `${student.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-gray-500">{student.lastActive}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors" title="Send Message">
                                            <HiMail className="w-4 h-4 text-blue-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredStudents.length === 0 && (
                    <div className="text-center py-12">
                        <HiAcademicCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No students found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorStudents;
