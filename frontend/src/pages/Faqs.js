import React from 'react';

const Faqs = () => {
    const faqs = [
        { q: 'How do I enroll in a course?', a: 'Visit the course page and click Enroll. You may need to create an account first.' },
        { q: 'How do I become an instructor?', a: 'Register as an instructor and submit your course for review. Admin will approve it.' },
        { q: 'How do I get a refund?', a: 'Contact support with your order details and we will assist you.' }
    ];

    return (
        <div className="min-h-screen bg-white py-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-lg border">
                            <h3 className="font-semibold">{f.q}</h3>
                            <p className="text-gray-600 mt-1">{f.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faqs;
