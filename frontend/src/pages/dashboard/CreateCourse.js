import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
    HiBookOpen,
    HiTag,
    HiAcademicCap,
    HiCurrencyDollar,
    HiArrowLeft,
    HiCheck,
    HiDocumentText
} from 'react-icons/hi';

const CreateCourse = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Programming',
        level: 'Beginner',
        price: 0
    });

    const categories = [
        'Programming',
        'Design',
        'Business',
        'Marketing',
        'Data Science',
        'Other'
    ];

    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error('Please enter a course title');
            return;
        }

        if (!formData.description.trim()) {
            toast.error('Please enter a course description');
            return;
        }

        if (formData.description.length < 50) {
            toast.error('Description should be at least 50 characters');
            return;
        }

        setIsSubmitting(true);

        try {
            await api.post('/courses', formData);
            toast.success('Course created successfully! It will be reviewed by admin.');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create course');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                >
                    <HiArrowLeft className="w-5 h-5" />
                    Back
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                <p className="text-gray-500 mt-1">Fill in the details to create your course. It will be reviewed before publishing.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Title */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2 mb-3">
                            <HiBookOpen className="w-5 h-5 text-blue-600" />
                            Course Title
                        </div>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Complete Web Development Bootcamp"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        maxLength={200}
                    />
                    <p className="text-xs text-gray-400 mt-2">{formData.title.length}/200 characters</p>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2 mb-3">
                            <HiDocumentText className="w-5 h-5 text-blue-600" />
                            Course Description
                        </div>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe what students will learn in this course. Be specific about the topics covered, prerequisites, and what makes your course unique."
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        maxLength={5000}
                    />
                    <p className="text-xs text-gray-400 mt-2">{formData.description.length}/5000 characters (minimum 50)</p>
                </div>

                {/* Category and Level */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2 mb-3">
                                <HiTag className="w-5 h-5 text-blue-600" />
                                Category
                            </div>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Level */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2 mb-3">
                                <HiAcademicCap className="w-5 h-5 text-blue-600" />
                                Difficulty Level
                            </div>
                        </label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer"
                        >
                            {levels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Price */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2 mb-3">
                            <HiCurrencyDollar className="w-5 h-5 text-blue-600" />
                            Price (USD)
                        </div>
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            placeholder="0"
                            className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Set to 0 for a free course</p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                    <ul className="space-y-2 text-sm text-blue-700">
                        <li className="flex items-start gap-2">
                            <HiCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            Your course will be submitted for admin review
                        </li>
                        <li className="flex items-start gap-2">
                            <HiCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            Once approved, you can add lessons and content
                        </li>
                        <li className="flex items-start gap-2">
                            <HiCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            Students will be able to enroll after approval
                        </li>
                    </ul>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating...
                            </>
                        ) : (
                            <>
                                <HiCheck className="w-5 h-5" />
                                Create Course
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;
