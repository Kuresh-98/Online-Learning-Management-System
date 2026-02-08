import React, { useState, useEffect } from 'react';
import {
    HiStar,
    HiPencil,
    HiTrash,
    HiBookOpen,
    HiCalendar,
    HiCheck
} from 'react-icons/hi';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const StudentReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingReview, setEditingReview] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch enrolled courses
            const enrollmentsRes = await api.get('/enrollments/my-courses');
            const enrollments = enrollmentsRes.data.data || [];
            setEnrolledCourses(enrollments);

            // Extract reviews from enrollments (where review exists)
            const reviewsFromEnrollments = enrollments
                .filter(enrollment => enrollment.rating || enrollment.review)
                .map(enrollment => ({
                    id: enrollment._id,
                    courseId: enrollment.course?._id,
                    courseName: enrollment.course?.title || 'Unknown Course',
                    courseImage: enrollment.course?.thumbnail,
                    rating: enrollment.rating || 0,
                    text: enrollment.review || '',
                    createdAt: enrollment.updatedAt || enrollment.enrolledAt,
                    helpful: 0
                }));

            setReviews(reviewsFromEnrollments);
        } catch (error) {
            console.error('Error fetching data:', error);
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitReview = () => {
        if (!selectedCourse || !reviewText.trim()) {
            toast.error('Please select a course and write a review');
            return;
        }

        const course = enrolledCourses.find(e => e.course?._id === selectedCourse);

        if (editingReview) {
            // Update existing review
            setReviews(reviews.map(r =>
                r.id === editingReview.id
                    ? { ...r, rating, text: reviewText }
                    : r
            ));
            toast.success('Review updated successfully');
        } else {
            // Add new review
            const newReview = {
                id: Date.now(),
                courseId: selectedCourse,
                courseName: course?.course?.title,
                courseImage: course?.course?.thumbnail,
                rating,
                text: reviewText,
                createdAt: new Date().toISOString(),
                helpful: 0
            };
            setReviews([newReview, ...reviews]);
            toast.success('Review submitted successfully');
        }

        // Reset form
        setShowReviewForm(false);
        setEditingReview(null);
        setSelectedCourse('');
        setRating(5);
        setReviewText('');
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
        setSelectedCourse(review.courseId);
        setRating(review.rating);
        setReviewText(review.text);
        setShowReviewForm(true);
    };

    const handleDeleteReview = (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            setReviews(reviews.filter(r => r.id !== reviewId));
            toast.success('Review deleted');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Courses that haven't been reviewed yet
    const unreviewedCourses = enrolledCourses.filter(
        enrollment => !reviews.some(r => r.courseId === enrollment.course?._id)
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
                    <p className="text-gray-500">Share your feedback on the courses you've taken</p>
                </div>
                {unreviewedCourses.length > 0 && !showReviewForm && (
                    <button
                        onClick={() => setShowReviewForm(true)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                    >
                        Write a Review
                    </button>
                )}
            </div>

            {/* Review Form */}
            {showReviewForm && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {editingReview ? 'Edit Review' : 'Write a Review'}
                    </h2>

                    {/* Course Selection */}
                    {!editingReview && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Course
                            </label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Choose a course...</option>
                                {unreviewedCourses.map((enrollment) => (
                                    <option key={enrollment._id} value={enrollment.course?._id}>
                                        {enrollment.course?.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Rating */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none"
                                >
                                    <HiStar
                                        className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review
                        </label>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={4}
                            placeholder="Share your experience with this course..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleSubmitReview}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                        >
                            {editingReview ? 'Update Review' : 'Submit Review'}
                        </button>
                        <button
                            onClick={() => {
                                setShowReviewForm(false);
                                setEditingReview(null);
                                setSelectedCourse('');
                                setRating(5);
                                setReviewText('');
                            }}
                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                        <HiPencil className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                    <p className="text-sm text-gray-500">Reviews Written</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mb-3">
                        <HiStar className="w-5 h-5 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0'}
                    </p>
                    <p className="text-sm text-gray-500">Avg. Rating Given</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                        <HiCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{reviews.reduce((acc, r) => acc + r.helpful, 0)}</p>
                    <p className="text-sm text-gray-500">Found Helpful</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                        <HiBookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{unreviewedCourses.length}</p>
                    <p className="text-sm text-gray-500">Pending Reviews</p>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900">Your Reviews</h2>

                {reviews.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                        <HiStar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
                        <p className="text-gray-500 mb-4">You haven't written any reviews. Share your experience!</p>
                        {unreviewedCourses.length > 0 && (
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                            >
                                Write Your First Review
                            </button>
                        )}
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                        {review.courseImage ? (
                                            <img
                                                src={review.courseImage}
                                                alt={review.courseName}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <HiBookOpen className="w-8 h-8 text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900">{review.courseName}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <HiStar
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <HiCalendar className="w-4 h-4" />
                                                {formatDate(review.createdAt)}
                                            </span>
                                        </div>
                                        <p className="mt-3 text-gray-600">{review.text}</p>
                                        <p className="mt-2 text-sm text-gray-400">
                                            {review.helpful} people found this helpful
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditReview(review)}
                                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                        title="Edit Review"
                                    >
                                        <HiPencil className="w-4 h-4 text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteReview(review.id)}
                                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                        title="Delete Review"
                                    >
                                        <HiTrash className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StudentReviews;
