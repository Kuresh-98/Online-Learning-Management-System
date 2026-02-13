import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-white py-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
                <p className="text-gray-600 mb-4">These terms govern your use of Learnify. By using the service you agree to these terms.</p>
                <section className="prose prose-lg text-gray-700">
                    <h2>Use of Service</h2>
                    <p>Users must comply with applicable laws and not misuse the platform.</p>
                    <h2>Content</h2>
                    <p>Instructors are responsible for their course content. We reserve the right to remove content that violates policies.</p>
                    <h2>Disclaimer</h2>
                    <p>Service is provided as-is. Learnify is not liable for user outcomes.</p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
