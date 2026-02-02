import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
    HiBookOpen,
    HiPlay,
    HiClock,
    HiUsers,
    HiStar,
    HiCheckCircle,
    HiAcademicCap,
    HiDocumentText,
    HiLockClosed,
    HiChevronDown,
    HiChevronUp,
    HiArrowLeft,
    HiHeart,
    HiShare
} from 'react-icons/hi';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});

    useEffect(() => {
        fetchCourseDetails();
        if (isAuthenticated) {
            checkEnrollment();
        }
    }, [id, isAuthenticated]);

    const fetchCourseDetails = async () => {
        try {
            const [courseRes, lessonsRes] = await Promise.all([
                api.get(`/courses/${id}`),
                api.get(`/lessons/course/${id}`)
            ]);
            setCourse(courseRes.data.data);
            setLessons(lessonsRes.data.data || []);
        } catch (error) {
            console.error('Error fetching course:', error);
            toast.error('Failed to load course details');
        } finally {
            setLoading(false);
        }
    };

    const checkEnrollment = async () => {
        try {
            const res = await api.get('/enrollments/my');
            const enrolled = res.data.data?.some(e => e.course?._id === id);
            setIsEnrolled(enrolled);
        } catch (error) {
            console.error('Error checking enrollment:', error);
        }
    };

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to enroll in courses');
            navigate('/login', { state: { from: { pathname: `/course/${id}` } } });
            return;
        }

        setEnrolling(true);
        try {
            await api.post(`/enrollments/${id}`);
            toast.success('Successfully enrolled in the course! 🎉');
            setIsEnrolled(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to enroll');
        } finally {
            setEnrolling(false);
        }
    };

    const toggleSection = (sectionIndex) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionIndex]: !prev[sectionIndex]
        }));
    };

    const getLevelBadgeColor = (level) => {
        switch (level) {
            case 'beginner':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'advanced':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    // Group lessons by section (mock grouping - you can enhance this)
    const groupedLessons = lessons.reduce((acc, lesson, index) => {
        const sectionNum = Math.floor(index / 3);
        if (!acc[sectionNum]) {
            acc[sectionNum] = {
                title: `Section ${sectionNum + 1}`,
                lessons: []
            };
        }
        acc[sectionNum].lessons.push(lesson);
        return acc;
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="h-64 bg-gray-200 rounded-2xl"></div>
                                <div className="h-32 bg-gray-200 rounded-2xl"></div>
                            </div>
                            <div className="h-96 bg-gray-200 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <HiBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
                    <p className="text-gray-500 mb-6">The course you're looking for doesn't exist.</p>
                    <Link to="/courses" className="btn-primary">Browse Courses</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                        <Link to="/courses" className="hover:text-white flex items-center gap-1">
                            <HiArrowLeft className="w-4 h-4" />
                            Back to Courses
                        </Link>
                        <span>/</span>
                        <span className="text-gray-300">{course.category || 'Course'}</span>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Content */}
                        <div className="lg:col-span-2">
                            {/* Category & Level */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                                    {course.category || 'Development'}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize border ${getLevelBadgeColor(course.level)}`}>
                                    {course.level}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                                {course.title}
                            </h1>

                            {/* Description */}
                            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                {course.description}
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <HiStar className="w-5 h-5" />
                                        <span className="font-semibold">{course.averageRating?.toFixed(1) || '0.0'}</span>
                                    </div>
                                    <span className="text-gray-400">({course.reviews?.length || 0} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiUsers className="w-5 h-5" />
                                    <span>{course.enrolledCount || 0} students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiClock className="w-5 h-5" />
                                    <span>{lessons.length} lessons</span>
                                </div>
                            </div>

                            {/* Instructor */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {course.instructor?.name?.charAt(0).toUpperCase() || 'I'}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Created by</p>
                                    <p className="font-semibold text-white">{course.instructor?.name || 'Instructor'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right - Enrollment Card */}
                        <div className="lg:row-start-1">
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-24">
                                {/* Preview Image */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <HiBookOpen className="w-16 h-16 text-white/30" />
                                    )}
                                    <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                            <HiPlay className="w-7 h-7 text-blue-600 ml-1" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-6">
                                    {/* Price */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-3xl font-bold text-gray-900">
                                            {course.price ? `$${course.price}` : 'Free'}
                                        </span>
                                        {course.originalPrice && (
                                            <span className="text-lg text-gray-400 line-through">
                                                ${course.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* Enroll Button */}
                                    {isEnrolled ? (
                                        <Link
                                            to={`/course/${id}/learn`}
                                            className="w-full btn-primary flex items-center justify-center gap-2 mb-4"
                                        >
                                            <HiPlay className="w-5 h-5" />
                                            Continue Learning
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={handleEnroll}
                                            disabled={enrolling}
                                            className="w-full btn-primary flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
                                        >
                                            {enrolling ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <HiAcademicCap className="w-5 h-5" />
                                                    Enroll Now
                                                </>
                                            )}
                                        </button>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mb-6">
                                        <button className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                            <HiHeart className="w-5 h-5" />
                                            Save
                                        </button>
                                        <button className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                            <HiShare className="w-5 h-5" />
                                            Share
                                        </button>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-3">
                                            <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span>Full lifetime access</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span>Access on mobile and desktop</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span>Certificate of completion</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span>Downloadable resources</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:pr-96">
                    {/* What You'll Learn */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    'Understand core concepts and fundamentals',
                                    'Build real-world projects from scratch',
                                    'Learn best practices and industry standards',
                                    'Master advanced techniques and patterns',
                                    'Gain practical hands-on experience',
                                    'Prepare for professional certification'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-600">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Course Content */}
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
                            <span className="text-gray-500">{lessons.length} lessons</span>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            {groupedLessons.length === 0 ? (
                                <div className="p-8 text-center">
                                    <HiDocumentText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No lessons available yet</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {groupedLessons.map((section, sectionIndex) => (
                                        <div key={sectionIndex}>
                                            {/* Section Header */}
                                            <button
                                                onClick={() => toggleSection(sectionIndex)}
                                                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm">
                                                        {sectionIndex + 1}
                                                    </div>
                                                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                                                    <span className="text-sm text-gray-400">{section.lessons.length} lessons</span>
                                                </div>
                                                {expandedSections[sectionIndex] ? (
                                                    <HiChevronUp className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <HiChevronDown className="w-5 h-5 text-gray-400" />
                                                )}
                                            </button>

                                            {/* Lessons */}
                                            {expandedSections[sectionIndex] && (
                                                <div className="bg-gray-50 divide-y divide-gray-100">
                                                    {section.lessons.map((lesson, lessonIndex) => (
                                                        <div
                                                            key={lesson._id}
                                                            className="flex items-center gap-4 px-5 py-4 hover:bg-gray-100 transition-colors"
                                                        >
                                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200 text-gray-500">
                                                                {isEnrolled ? (
                                                                    <HiPlay className="w-4 h-4" />
                                                                ) : (
                                                                    <HiLockClosed className="w-4 h-4" />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-medium text-gray-900 truncate">{lesson.title}</h4>
                                                                <p className="text-sm text-gray-500 truncate">{lesson.type}</p>
                                                            </div>
                                                            <span className="text-sm text-gray-400">
                                                                {lesson.duration || '5 min'}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Instructor */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructor</h2>
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <div className="flex items-start gap-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                                    {course.instructor?.name?.charAt(0).toUpperCase() || 'I'}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {course.instructor?.name || 'Instructor'}
                                    </h3>
                                    <p className="text-blue-600 mb-4">{course.instructor?.title || 'Expert Instructor'}</p>
                                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <HiStar className="w-4 h-4 text-yellow-400" />
                                            <span>4.8 Instructor Rating</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <HiUsers className="w-4 h-4" />
                                            <span>10,000+ Students</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <HiBookOpen className="w-4 h-4" />
                                            <span>15 Courses</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">
                                        Passionate educator with years of industry experience.
                                        Dedicated to helping students achieve their learning goals
                                        through practical, hands-on instruction.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
