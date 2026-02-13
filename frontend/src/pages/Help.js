import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
    return (
        <div className="min-h-screen bg-white py-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-bold mb-4">Help Center</h1>
                <p className="text-gray-600 mb-6">Find answers to common questions about using Learnify. If you need more help, contact our support team.</p>

                <div className="space-y-4">
                    <Link to="/faqs" className="text-blue-600 hover:underline">Visit FAQs</Link>
                    <a href="mailto:support@learnify.com" className="text-blue-600 hover:underline">Contact Support</a>
                </div>
            </div>
        </div>
    );
};

export default Help;
