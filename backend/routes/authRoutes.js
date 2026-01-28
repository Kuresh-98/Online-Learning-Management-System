const express = require('express');
const { register, login, getMe } = require('../controllers/authController');

// Create router
const router = express.Router();

/**
 * Auth Routes
 * 
 * POST   /api/auth/register  - Register new user
 * POST   /api/auth/login     - Login user
 * GET    /api/auth/me        - Get current user (protected)
 */

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route (we'll add middleware in Step 5)
// router.get('/me', protect, getMe);
router.get('/me', getMe); // For now, without protection

module.exports = router;