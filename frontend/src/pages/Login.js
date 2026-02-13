import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
    HiAcademicCap,
    HiMail,
    HiLockClosed,
    HiEye,
    HiEyeOff,
    HiArrowRight,
    HiSparkles
} from 'react-icons/hi';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the redirect path or default to dashboard
    const from = location.state?.from?.pathname || '/dashboard';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            toast.success('Welcome back! 🎉');
            navigate(from, { replace: true });
        } else {
            toast.error(result.message);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md animate-fade-in">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-blue-600 mb-8">
                        <HiAcademicCap className="w-10 h-10" />
                        <span className="text-2xl font-bold text-gray-900">Learnify</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
                        <p className="text-gray-600">Enter your credentials to access your account.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                                    Forgot password?
                                </Link>
                            </div>
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

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Sign In
                                    <HiArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="flex flex-col gap-4">
                        <GoogleLogin
                            onSuccess={async credentialResponse => {
                                try {
                                    if (!credentialResponse.credential) {
                                        toast.error('No credential received from Google');
                                        return;
                                    }
                                    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/google-login`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ credential: credentialResponse.credential })
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                        // Save token and user to localStorage
                                        localStorage.setItem('token', data.data.token);
                                        localStorage.setItem('user', JSON.stringify(data.data));
                                        googleLogin();
                                        toast.success('Google Sign-In successful!');
                                        navigate('/dashboard', { replace: true });
                                    } else {
                                        toast.error(data.message || 'Google Sign-In failed');
                                    }
                                } catch (err) {
                                    toast.error('Google Sign-In failed');
                                }
                            }}
                            onError={() => {
                                toast.error('Google Sign-In failed');
                            }}
                        />
                    </div>

                    {/* Sign Up Link */}
                    <p className="mt-8 text-center text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700">
                            Sign up free
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white p-12 items-center justify-center relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="relative z-10 max-w-md text-center animate-fade-in">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <HiSparkles className="w-10 h-10 text-yellow-300" />
                    </div>

                    <h2 className="text-3xl font-bold mb-6">
                        Start your learning journey today
                    </h2>

                    <p className="text-blue-100 mb-8">
                        Access thousands of courses from expert instructors. Learn at your own pace and achieve your goals.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <div className="flex -space-x-2">
                            {['A', 'B', 'C', 'D'].map((letter, i) => (
                                <div key={i} className="w-10 h-10 bg-white/20 rounded-full border-2 border-white flex items-center justify-center text-sm font-bold">
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm text-blue-200">
                            Join <strong className="text-white">10,000+</strong> learners
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
