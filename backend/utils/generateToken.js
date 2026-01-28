const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 * 
 * This creates a secure token containing user ID
 * Token is sent to frontend and used for authentication
 * 
 * @param {String} userId - MongoDB user _id
 * @returns {String} - JWT token
 */
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, // Payload (data stored in token)
        process.env.JWT_SECRET, // Secret key from .env
        { expiresIn: '30d' } // Token expires in 30 days
    );
};

module.exports = generateToken;