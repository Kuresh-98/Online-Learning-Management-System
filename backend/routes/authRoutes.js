const express = require('express');
const { register, login, getMe, getAllUsers } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');


// Create router
const router = express.Router();

/**
 * Auth Routes
 * 
 * POST   /api/auth/register  - Register new user
 * POST   /api/auth/login     - Login user
 * GET    /api/auth/me        - Get current user (protected)
 * GET    /api/auth/users     - Get all users (admin only)
 */

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

// Admin routes
router.get('/users', protect, authorize('admin'), getAllUsers);

module.exports = router;