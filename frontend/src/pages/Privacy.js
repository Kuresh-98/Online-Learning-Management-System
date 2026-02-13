import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-white py-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-gray-600 mb-4">We take your privacy seriously. This page outlines how we collect, use, and protect your information.</p>
                <section className="prose prose-lg text-gray-700">
                    <h2>Information We Collect</h2>
                    <p>We collect information you provide when creating an account, enrolling in courses, or contacting support.</p>
                    <h2>How We Use Information</h2>
                    <p>We use data to provide services, process payments, and improve the platform.</p>
                    <h2>Contact</h2>
                    <p>If you have privacy concerns, contact support@learnify.com.</p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
