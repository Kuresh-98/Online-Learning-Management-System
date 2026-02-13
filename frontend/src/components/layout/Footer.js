import React from 'react';
import { Link } from 'react-router-dom';
import { HiAcademicCap, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';


const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    const categories = [
        { name: 'Web Development', path: '/courses?category=programming' },
        { name: 'Data Science', path: '/courses?category=data-science' },
        { name: 'Business', path: '/courses?category=business' },
        { name: 'Design', path: '/courses?category=design' },
        { name: 'Marketing', path: '/courses?category=marketing' }
    ];

    const support = [
        { name: 'Help Center', path: '/help' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' }
    ];



    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <HiAcademicCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Learnify</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Empowering learners worldwide with quality education.
                            Start your learning journey today and unlock your potential.
                        </p>
                        {/* Social Links */}

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Categories</h4>
                        <ul className="space-y-3">
                            {categories.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <HiLocationMarker className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-400">
                                    Anand , Gujarat, India.
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <HiMail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <a href="mailto:support@learnify.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    support@learnify.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <HiPhone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <a href="tel:+919408256972" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    +91 9408256972
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            © {currentYear} Learnify. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            {support.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-sm text-gray-500 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
