const express = require('express');
const { register, login, getMe, getAllUsers, forgotPassword, resetPassword, changePassword } = require('../controllers/authController');
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
router.post('/forgot-password', forgotPassword);

// Protected routes
router.get('/me', protect, getMe);

// Admin routes
router.get('/users', protect, authorize('admin'), getAllUsers);
// Admin: update or delete user
router.put('/users/:id', protect, authorize('admin'), require('../controllers/authController').updateUserByAdmin);
router.delete('/users/:id', protect, authorize('admin'), require('../controllers/authController').deleteUserByAdmin);

router.post('/reset-password', resetPassword);
router.post('/change-password', protect, changePassword); // protect = authentication middleware

module.exports = router;