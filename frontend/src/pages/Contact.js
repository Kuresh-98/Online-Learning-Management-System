import React, { useState } from 'react';
import {
    HiMail,
    HiPhone,
    HiLocationMarker,
    HiClock,
    HiChat,
    HiQuestionMarkCircle,
    HiSupport,
    HiPaperAirplane
} from 'react-icons/hi';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: <HiMail className="w-6 h-6" />,
            title: 'Email Us',
            details: 'support@learnhub.com',
            subtext: 'We reply within 24 hours'
        },
        {
            icon: <HiPhone className="w-6 h-6" />,
            title: 'Call Us',
            details: '+91 98765 43210',
            subtext: 'Mon-Fri, 9AM-6PM IST'
        },
        {
            icon: <HiLocationMarker className="w-6 h-6" />,
            title: 'Visit Us',
            details: 'Koramangala, Bangalore',
            subtext: 'Karnataka, India 560034'
        },
        {
            icon: <HiClock className="w-6 h-6" />,
            title: 'Business Hours',
            details: 'Monday - Friday',
            subtext: '9:00 AM - 6:00 PM IST'
        }
    ];

    const faqs = [
        {
            question: 'How do I enroll in a course?',
            answer: 'Simply browse our courses, click on the one you like, and hit the Enroll button. You\'ll need to create an account if you haven\'t already.'
        },
        {
            question: 'Are the courses free?',
            answer: 'Many of our courses are completely free. Some premium courses may have a fee, which is clearly displayed on the course page.'
        },
        {
            question: 'Can I become an instructor?',
            answer: 'Yes! Register as an instructor and submit your course for review. Once approved, you can start teaching immediately.'
        },
        {
            question: 'How do I get a certificate?',
            answer: 'Complete all lessons and assignments in a course to receive your certificate. It will be available in your dashboard.'
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <HiChat className="w-4 h-4" />
                            Get in Touch
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            We'd Love to
                            <span className="text-blue-600"> Hear From You</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Have questions, feedback, or need support? Our team is here to help.
                            Reach out and we'll respond as soon as we can.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12 -mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                    {info.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                                <p className="text-gray-900">{info.details}</p>
                                <p className="text-sm text-gray-500">{info.subtext}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Tell us more about your question or feedback..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <HiPaperAirplane className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Map / Support Info */}
                        <div>
                            <div className="bg-gray-100 rounded-2xl h-64 mb-6 overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965919426!2d77.6205!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA2LjciTiA3N8KwMzcnMTMuOCJF!5e0!3m2!1sen!2sin!4v1707300000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="LearnHub Location"
                                    className="grayscale hover:grayscale-0 transition-all"
                                />
                            </div>

                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <HiSupport className="w-8 h-8" />
                                    <h3 className="text-xl font-bold">Need Immediate Help?</h3>
                                </div>
                                <p className="text-blue-100 mb-4">
                                    Our support team is available during business hours to assist you with any urgent queries.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="mailto:support@learnhub.com"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                    >
                                        <HiMail className="w-4 h-4" />
                                        Email Support
                                    </a>
                                    <a
                                        href="tel:+919876543210"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                    >
                                        <HiPhone className="w-4 h-4" />
                                        Call Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <HiQuestionMarkCircle className="w-4 h-4" />
                            FAQ
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Quick answers to common questions</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
