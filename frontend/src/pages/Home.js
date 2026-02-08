import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    HiAcademicCap,
    HiPlay,
    HiUsers,
    HiStar,
    HiArrowRight,
    HiSparkles,
    HiGlobe,
    HiClock,
    HiShieldCheck,
    HiChevronRight,
    HiBookOpen,
    HiViewGrid
} from 'react-icons/hi';
import { FaGraduationCap, FaLaptopCode, FaPalette, FaChartLine } from 'react-icons/fa';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const categories = [
        { icon: <FaLaptopCode />, name: 'Development', courses: 24, color: 'from-blue-500 to-cyan-400' },
        { icon: <FaPalette />, name: 'Design', courses: 18, color: 'from-pink-500 to-rose-400' },
        { icon: <FaChartLine />, name: 'Business', courses: 15, color: 'from-green-500 to-emerald-400' },
        { icon: <FaGraduationCap />, name: 'Academic', courses: 21, color: 'from-purple-500 to-violet-400' },
    ];

    const featuredCourses = [
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
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <HiAcademicCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                LearnHub
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/courses" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                Courses
                            </Link>
                            <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                About
                            </Link>
                            <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                Contact
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <HiViewGrid className="w-4 h-4" />
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

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

                        {/* Trust Indicators */}
                        <div className={`flex flex-wrap items-center justify-center gap-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {['https://randomuser.me/api/portraits/women/1.jpg', 'https://randomuser.me/api/portraits/men/2.jpg', 'https://randomuser.me/api/portraits/women/3.jpg', 'https://randomuser.me/api/portraits/men/4.jpg'].map((img, i) => (
                                        <img key={i} src={img} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    <strong className="text-gray-900">500+</strong> active learners
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    <strong className="text-gray-900">4.6</strong> average rating
                                </span>
                            </div>
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
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Learn with LearnHub?
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
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex mb-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
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

            {/* Footer */}
            <footer className="py-16 bg-gray-900 text-gray-400">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <HiAcademicCap className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">LearnHub</span>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Empowering learners worldwide with quality education and expert-led courses.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Platform</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/courses" className="hover:text-white transition-colors">Browse Courses</Link></li>
                                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Categories</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/courses?category=development" className="hover:text-white transition-colors">Development</Link></li>
                                <li><Link to="/courses?category=design" className="hover:text-white transition-colors">Design</Link></li>
                                <li><Link to="/courses?category=business" className="hover:text-white transition-colors">Business</Link></li>
                                <li><Link to="/courses?category=academic" className="hover:text-white transition-colors">Academic</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm">© 2026 LearnHub. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
