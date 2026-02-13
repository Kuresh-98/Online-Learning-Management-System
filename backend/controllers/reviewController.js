const Enrollment = require('../models/enrollment');

/**
 * @desc Get recent public reviews across courses
 * @route GET /api/reviews
 * @access Public
 */
exports.getRecentReviews = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 6;

        const reviews = await Enrollment.find({ review: { $ne: null } })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('student', 'name profilePicture')
            .populate('course', 'title thumbnail');

        res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } catch (error) {
        console.error('Get Reviews Error:', error);
        res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
    }
};
