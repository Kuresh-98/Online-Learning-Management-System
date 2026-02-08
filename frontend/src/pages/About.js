import React from 'react';
import { Link } from 'react-router-dom';
import {
    HiAcademicCap,
    HiUsers,
    HiGlobe,
    HiLightBulb,
    HiHeart,
    HiShieldCheck,
    HiArrowRight
} from 'react-icons/hi';

const About = () => {
    const stats = [
        { value: '10K+', label: 'Active Students' },
        { value: '500+', label: 'Courses Available' },
        { value: '100+', label: 'Expert Instructors' },
        { value: '95%', label: 'Satisfaction Rate' }
    ];

    const values = [
        {
            icon: <HiLightBulb className="w-6 h-6" />,
            title: 'Innovation',
            description: 'We constantly evolve our platform to deliver cutting-edge learning experiences.'
        },
        {
            icon: <HiUsers className="w-6 h-6" />,
            title: 'Community',
            description: 'We foster a supportive environment where learners help each other grow.'
        },
        {
            icon: <HiShieldCheck className="w-6 h-6" />,
            title: 'Quality',
            description: 'Every course is vetted by experts to ensure high educational standards.'
        },
        {
            icon: <HiHeart className="w-6 h-6" />,
            title: 'Accessibility',
            description: 'We believe quality education should be accessible to everyone, everywhere.'
        }
    ];

    const team = [
        {
            name: 'Rajesh Kumar',
            role: 'Founder & CEO',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            bio: 'Former educator with 15+ years in EdTech'
        },
        {
            name: 'Priya Sharma',
            role: 'Head of Content',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            bio: 'Curriculum design specialist from IIT Delhi'
        },
        {
            name: 'Amit Patel',
            role: 'CTO',
            image: 'https://randomuser.me/api/portraits/men/52.jpg',
            bio: 'Full-stack developer, ex-Google engineer'
        },
        {
            name: 'Sneha Reddy',
            role: 'Head of Operations',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            bio: 'MBA from ISB, operations excellence expert'
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <HiAcademicCap className="w-4 h-4" />
                            About LearnHub
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Empowering Learners to
                            <span className="text-blue-600"> Achieve More</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            LearnHub was founded with a simple mission: to make quality education accessible to everyone.
                            We connect passionate instructors with eager learners, creating a vibrant community
                            dedicated to growth and knowledge sharing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    LearnHub started in 2022 as a small project by a group of educators who saw the
                                    potential of online learning. Frustrated by expensive courses and inaccessible
                                    content, we set out to create a platform that puts learners first.
                                </p>
                                <p>
                                    Today, we've grown into a thriving community of students and instructors from
                                    across the globe. Our platform hosts hundreds of courses spanning technology,
                                    business, design, and beyond.
                                </p>
                                <p>
                                    We believe that learning should be a lifelong journey, not a destination.
                                    That's why we continuously improve our platform, add new features, and
                                    support our community in their educational pursuits.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                                <HiGlobe className="w-16 h-16 mb-6 opacity-80" />
                                <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
                                <p className="text-blue-100">
                                    Our students come from over 50 countries, united by a shared passion for
                                    learning and self-improvement. We support multiple languages and offer
                                    content that's relevant across cultures.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            These core principles guide everything we do at LearnHub.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The passionate people behind LearnHub who work tirelessly to make learning accessible.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative mb-4 inline-block">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full object-cover mx-auto ring-4 ring-gray-100 group-hover:ring-blue-100 transition-all"
                                    />
                                </div>
                                <h3 className="font-bold text-gray-900">{member.name}</h3>
                                <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                                <p className="text-gray-500 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Learning Journey?
                    </h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                        Join thousands of learners who are already transforming their careers with LearnHub.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            Get Started Free
                            <HiArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/courses"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/10 transition-colors"
                        >
                            Browse Courses
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
