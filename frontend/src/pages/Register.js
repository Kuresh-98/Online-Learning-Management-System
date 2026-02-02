import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
    HiAcademicCap,
    HiMail,
    HiLockClosed,
    HiUser,
    HiEye,
    HiEyeOff,
    HiArrowRight,
    HiCheckCircle,
    HiShieldCheck
} from 'react-icons/hi';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const passwordRequirements = [
        { label: 'At least 6 characters', check: formData.password.length >= 6 },
        { label: 'Contains a number', check: /\d/.test(formData.password) },
        { label: 'Passwords match', check: formData.password === formData.confirmPassword && formData.confirmPassword !== '' }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters!');
            return;
        }

        if (!agreedToTerms) {
            toast.error('Please agree to the terms and conditions!');
            return;
        }

        setIsLoading(true);

        const result = await register(
            formData.name,
            formData.email,
            formData.password,
            formData.role
        );

        if (result.success) {
            toast.success('Account created successfully! 🎉');
            navigate('/dashboard', { replace: true });
        } else {
            toast.error(result.error);
        }

        setIsLoading(false);
    };

    const roles = [
        {
            value: 'student',
            label: 'Student',
            description: 'Browse and enroll in courses',
            icon: <HiAcademicCap className="w-5 h-5" />
        },
        {
            value: 'instructor',
            label: 'Instructor',
            description: 'Create and manage courses',
            icon: <HiUser className="w-5 h-5" />
        }
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-blue-600 to-blue-700 text-white p-12 items-center justify-center relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 left-10 w-60 h-60 bg-white rounded-full"></div>
                    <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white rounded-full"></div>
                </div>

                <div className="relative z-10 max-w-md animate-fade-in">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center mb-8">
                        <HiShieldCheck className="w-10 h-10 text-green-300" />
                    </div>

                    <h2 className="text-3xl font-bold mb-6">
                        Join our community of learners
                    </h2>

                    <p className="text-blue-100 mb-8">
                        Create your free account and start learning today. Access thousands of courses from world-class instructors.
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-4">
                        {[
                            'Access to 500+ courses',
                            'Learn at your own pace',
                            'Earn certificates',
                            'Community support'
                        ].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="w-6 h-6 bg-green-400/30 rounded-full flex items-center justify-center">
                                    <HiCheckCircle className="w-4 h-4 text-green-300" />
                                </div>
                                <span className="text-blue-100">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
                <div className="w-full max-w-md animate-fade-in py-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-blue-600 mb-8">
                        <HiAcademicCap className="w-10 h-10" />
                        <span className="text-2xl font-bold text-gray-900">LearnHub</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
                        <p className="text-gray-600">Fill in your details to get started.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                I want to join as
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {roles.map((role) => (
                                    <button
                                        key={role.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: role.value })}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.role === role.value
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${formData.role === role.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {role.icon}
                                        </div>
                                        <div className="font-semibold text-gray-900">{role.label}</div>
                                        <div className="text-xs text-gray-500">{role.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiUser className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="input-field pl-12"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiMail className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                    className="input-field pl-12"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiLockClosed className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="input-field pl-12 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiLockClosed className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="input-field pl-12 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        {formData.password && (
                            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                {passwordRequirements.map((req, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm">
                                        <HiCheckCircle className={`w-4 h-4 ${req.check ? 'text-green-500' : 'text-gray-300'}`} />
                                        <span className={req.check ? 'text-green-700' : 'text-gray-500'}>{req.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Terms Agreement */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the{' '}
                                <Link to="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
                            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Create Account
                                    <HiArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <p className="mt-8 text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
