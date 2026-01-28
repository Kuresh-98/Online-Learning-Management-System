const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware: Protect Routes
 * 
 * This middleware:
 * 1. Extracts JWT token from request headers
 * 2. Verifies the token is valid
 * 3. Extracts user ID from token
 * 4. Fetches user from database
 * 5. Attaches user to req.user for use in controllers
 * 
 * If token is invalid or missing, returns 401 error
 */
exports.protect = async (req, res, next) => {
    let token;

    // 1. Extract token from Authorization header
    // Header format: "Bearer eyJhbGciOi..."
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // 2. Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route. Please provide a token.'
        });
    }

    try {
        // 3. Verify token and extract payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Fetch user from database
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // 5. Pass control to next middleware/route
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
            error: error.message
        });
    }
};

/**
 * Middleware: Authorize by Role
 * 
 * This middleware checks if user has the required role
 * 
 * Usage: router.get('/admin-only', protect, authorize('admin'), controller)
 * 
 * @param {...String} allowedRoles - One or more role names (e.g., 'admin', 'instructor')
 */
exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if user's role is in allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role '${req.user.role}' is not authorized to access this route. Required role: ${allowedRoles.join(' or ')}`
            });
        }

        // Role is authorized, continue
        next();
    };
};