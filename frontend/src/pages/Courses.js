import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import {
    HiBookOpen,
    HiSearch,
    HiFilter,
    HiStar,
    HiClock,
    HiUsers,
    HiPlay,
    HiChevronDown,
    HiX
} from 'react-icons/hi';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        sort: 'newest'
    });
    const [showFilters, setShowFilters] = useState(false);

    const categories = [
        'All Categories',
        'Programming',
        'Design',
        'Business',
        'Marketing',
        'Data Science',
        'Other'
    ];

    const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'popular', label: 'Most Popular' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'title', label: 'Alphabetical' }
    ];

    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            let url = '/courses';
            const params = [];

            if (filters.category && filters.category !== 'All Categories') {
                params.push(`category=${encodeURIComponent(filters.category)}`);
            }
            if (filters.level && filters.level !== 'All Levels') {
                params.push(`level=${encodeURIComponent(filters.level)}`);
            }
            if (filters.sort) {
                params.push(`sort=${filters.sort}`);
            }

            if (params.length > 0) {
                url += '?' + params.join('&');
            }

            const res = await api.get(url);
            setCourses(res.data.data || []);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getLevelBadgeColor = (level) => {
        switch (level) {
            case 'Beginner':
                return 'bg-green-100 text-green-700';
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-700';
            case 'Advanced':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
                        <p className="text-lg text-blue-100 mb-8">
                            Discover hundreds of courses taught by industry experts.
                            Start learning today and advance your career.
                        </p>

                        {/* Search Bar */}
                        <div className="relative">
                            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search courses..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none shadow-lg"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <HiX className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                        </span>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <HiFilter className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                    {/* Desktop Filters */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Category Filter */}
                        <div className="relative">
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className="appearance-none px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-xl text-gray-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Level Filter */}
                        <div className="relative">
                            <select
                                value={filters.level}
                                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                                className="appearance-none px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-xl text-gray-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
                            >
                                {levels.map((level) => (
                                    <option key={level} value={level} className="capitalize">
                                        {level === 'All Levels' ? level : level.charAt(0).toUpperCase() + level.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={filters.sort}
                                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                                className="appearance-none px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-xl text-gray-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Mobile Filters Dropdown */}
                {showFilters && (
                    <div className="lg:hidden bg-white p-6 rounded-2xl border border-gray-200 mb-8 animate-fade-in">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                <select
                                    value={filters.level}
                                    onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl capitalize"
                                >
                                    {levels.map((level) => (
                                        <option key={level} value={level} className="capitalize">
                                            {level === 'All Levels' ? level : level.charAt(0).toUpperCase() + level.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                <select
                                    value={filters.sort}
                                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Courses Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <HiBookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <Link
                                key={course._id}
                                to={`/course/${course._id}`}
                                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Course Thumbnail */}
                                <div className="relative h-52 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <HiBookOpen className="w-20 h-20 text-white/30" />
                                    )}

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                                            <HiPlay className="w-7 h-7 text-blue-600 ml-1" />
                                        </div>
                                    </div>

                                    {/* Level Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getLevelBadgeColor(course.level)}`}>
                                            {course.level}
                                        </span>
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="p-6">
                                    {/* Category */}
                                    <div className="text-sm text-blue-600 font-medium mb-2">
                                        {course.category || 'General'}
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {course.title}
                                    </h3>

                                    {/* Instructor */}
                                    <p className="text-sm text-gray-500 mb-4">
                                        by {course.instructor?.name || 'Instructor'}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <HiStar className="w-4 h-4 text-yellow-400" />
                                            {course.averageRating?.toFixed(1) || '0.0'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <HiUsers className="w-4 h-4" />
                                            {course.enrolledCount || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <HiClock className="w-4 h-4" />
                                            {course.duration || '2h'}
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-2xl font-bold text-gray-900">
                                            {course.price ? `$${course.price}` : 'Free'}
                                        </span>
                                        <span className="text-blue-600 font-medium group-hover:underline">
                                            Learn More →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
