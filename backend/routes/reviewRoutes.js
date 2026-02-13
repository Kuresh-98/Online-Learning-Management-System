const express = require('express');
const router = express.Router();
const { getRecentReviews } = require('../controllers/reviewController');

// GET /api/reviews
router.get('/', getRecentReviews);

module.exports = router;
