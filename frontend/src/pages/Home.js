import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    HiAcademicCap,
    HiPlay,
    HiUsers,
    HiStar,
    HiArrowRight,
    HiGlobe,
    HiClock,
    HiShieldCheck,
    HiChevronRight,
    HiBookOpen
} from 'react-icons/hi';
import { FaGraduationCap, FaLaptopCode, FaPalette, FaChartLine } from 'react-icons/fa';
import api from '../utils/api';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        fetchFeaturedCourses();
        fetchReviews();
    }, []);

    const fetchFeaturedCourses = async () => {
        try {
            setCoursesLoading(true);
            const res = await api.get('/courses?sort=popular');
            // Get top 3 courses
            const courses = (res.data.data || []).slice(0, 3).map((course, index) => ({
                id: course._id,
                title: course.title,
                instructor: course.instructor?.name || 'Instructor',
                rating: course.rating || 4.5,
                students: course.enrolledCount || 0,
                price: course.price === 0 ? 'Free' : `₹${course.price}`,
                image: course.thumbnail || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
                tag: index === 0 ? 'Popular' : index === 1 ? 'Trending' : 'New'
            }));
            setFeaturedCourses(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
            // Fallback to default courses if API fails
            setFeaturedCourses([
                {
                    id: 1,
                    title: 'Web Development Bootcamp',
                    instructor: 'Rahul Sharma',
                    rating: 4.7,
                    students: 342,
                    price: 'Free',
                    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
                    tag: 'Popular'
                },
                {
                    id: 2,
                    title: 'Backend with Node.js',
                    instructor: 'Priya Patel',
                    rating: 4.5,
                    students: 218,
                    price: 'Free',
                    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
                    tag: 'Trending'
                },
                {
                    id: 3,
                    title: 'UI Design Essentials',
                    instructor: 'Amit Kumar',
                    rating: 4.6,
                    students: 156,
                    price: 'Free',
                    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
                    tag: 'New'
                },
            ]);
        } finally {
            setCoursesLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            setReviewsLoading(true);
            const res = await api.get('/reviews?limit=6');
            const data = res.data.data || [];
            const mapped = data.map((r) => ({
                id: r._id,
                name: r.student?.name || 'Student',
                image: r.student?.profilePicture || `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
                text: r.review,
                rating: r.rating || 5,
                courseTitle: r.course?.title || ''
            }));
            setReviews(mapped);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setReviews([]);
        } finally {
            setReviewsLoading(false);
        }
    };

    const categories = [
        { icon: <FaLaptopCode />, name: 'Programming', courses: 24, color: 'from-blue-500 to-cyan-400' },
        { icon: <FaPalette />, name: 'Design', courses: 18, color: 'from-pink-500 to-rose-400' },
        { icon: <FaChartLine />, name: 'Business', courses: 15, color: 'from-green-500 to-emerald-400' },
        { icon: <FaGraduationCap />, name: 'Data Science', courses: 21, color: 'from-purple-500 to-violet-400' },
    ];

    const testimonials = [
        {
            name: 'Vikram Reddy',
            role: 'Frontend Developer',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: 'Really helpful for getting practical skills. The project-based learning approach worked well for me.',
            rating: 5
        },
        {
            name: 'Sneha Gupta',
            role: 'Graphic Designer',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            text: 'Found exactly what I needed to upskill. Clean interface and easy to follow courses.',
            rating: 5
        },
        {
            name: 'Arjun Mehta',
            role: 'Computer Science Student',
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            text: 'Great platform for students. The free courses helped me learn alongside my college studies.',
            rating: 5
        },
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 lg:pt-28 lg:pb-32">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full blur-3xl opacity-40"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Main Heading */}
                        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                Master New Skills
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Shape Your Future
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className={`text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            Learn from world-class instructors. Build real-world projects.
                            Get certified and accelerate your career with industry-recognized skills.
                        </p>

                        {/* CTA Buttons */}
                        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <Link
                                to="/courses"
                                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                            >
                                Explore Courses
                                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/register"
                                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                            >
                                <HiPlay className="w-5 h-5 text-blue-600" />
                                Watch Demo
                            </Link>
                        </div>


                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '500+', label: 'Quality Courses', icon: <HiBookOpen /> },
                            { number: '50K+', label: 'Active Students', icon: <HiUsers /> },
                            { number: '200+', label: 'Expert Instructors', icon: <HiAcademicCap /> },
                            { number: '95%', label: 'Success Rate', icon: <HiShieldCheck /> },
                        ].map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center text-white/80 group-hover:bg-white/20 transition-colors">
                                    {React.cloneElement(stat.icon, { className: 'w-6 h-6' })}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Browse by Category
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our wide range of courses across different categories
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/courses?category=${category.name.toLowerCase()}`}
                                className="group relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform`}>
                                    {category.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
                                <p className="text-sm text-gray-500">{category.courses} courses</p>
                                <HiChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Featured Courses
                            </h2>
                            <p className="text-gray-600">
                                Hand-picked courses to help you get started
                            </p>
                        </div>
                        <Link
                            to="/courses"
                            className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                        >
                            View All Courses
                            <HiArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {coursesLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                                    <div className="h-48 bg-gray-200"></div>
                                    <div className="p-6">
                                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="flex gap-4 mb-4">
                                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        </div>
                                        <div className="flex justify-between pt-4 border-t border-gray-100">
                                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                                            <div className="h-10 bg-gray-200 rounded w-24"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : featuredCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <HiBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No courses available yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${course.tag === 'Bestseller' ? 'bg-yellow-400 text-yellow-900' :
                                            course.tag === 'Popular' ? 'bg-blue-500 text-white' :
                                                'bg-green-500 text-white'
                                            }`}>
                                            {course.tag}
                                        </span>
                                        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                                <HiPlay className="w-8 h-8 text-blue-600 ml-1" />
                                            </div>
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">by {course.instructor}</p>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center gap-1">
                                                <HiStar className="w-4 h-4 text-yellow-400" />
                                                <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-500">
                                                <HiUsers className="w-4 h-4" />
                                                <span className="text-sm">{course.students.toLocaleString()} students</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <span className="text-xl font-bold text-green-600">{course.price}</span>
                                            <Link
                                                to={`/course/${course.id}`}
                                                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                                            >
                                                Enroll Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Learn with Learnify?
                        </h2>
                        <p className="text-blue-100 max-w-2xl mx-auto">
                            We provide everything you need to succeed in your learning journey
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <HiPlay />, title: 'HD Video Lessons', desc: 'Crystal clear video content with lifetime access' },
                            { icon: <HiClock />, title: 'Learn at Your Pace', desc: 'Study whenever and wherever you want' },
                            { icon: <HiAcademicCap />, title: 'Earn Certificates', desc: 'Get recognized credentials upon completion' },
                            { icon: <HiGlobe />, title: 'Community Access', desc: 'Connect with learners worldwide' },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group"
                            >
                                <div className="w-12 h-12 mb-4 bg-white/20 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                    {React.cloneElement(feature.icon, { className: 'w-6 h-6' })}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-blue-100 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Our Students Say
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Real stories from real learners who transformed their careers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {reviewsLoading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-full mb-6"></div>
                                </div>
                            ))
                        ) : reviews.length === 0 ? (
                            <div className="text-center text-gray-500 col-span-3">No reviews yet.</div>
                        ) : (
                            reviews.map((t) => (
                                <div key={t.id} className="p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="flex mb-4">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <HiStar key={i} className={`w-5 h-5 ${i <= t.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-6 leading-relaxed">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{t.name}</h4>
                                            <p className="text-sm text-gray-500">{t.courseTitle}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <div className="p-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                                Join over 50,000 students and start learning today. It's free to get started!
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/register"
                                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    Create Free Account
                                    <HiArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/courses"
                                    className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
