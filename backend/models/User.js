const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema - Defines the structure of user data in MongoDB
 * 
 * Fields:
 * - name: User's full name
 * - email: Unique email for login
 * - password: Hashed password (never stored as plain text!)
 * - role: User type (student, instructor, admin)
 * - profilePicture: URL to user's profile image
 * - bio: User bio/description
 * - createdAt: Timestamp when user registered
 */

const userSchema = new mongoose.Schema(
    {
        // User's full name
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters']
        },

        // User's email (must be unique)
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email'
            ]
        },

        // User's password (will be hashed before saving)
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false // Don't return password by default in queries
        },

        // User role determines access (student, instructor, or admin)
        role: {
            type: String,
            enum: ['student', 'instructor', 'admin'],
            default: 'student'
        },

        // Optional: User's profile picture URL (from Cloudinary)
        profilePicture: {
            type: String,
            default: null
        },

        // Optional: User's bio/description
        bio: {
            type: String,
            default: '',
            maxlength: [500, 'Bio cannot exceed 500 characters']
        },

        // Track if user is active (soft delete)
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt
    }
);

/**
 * Middleware: Hash password before saving
 * This runs automatically before user is saved to database
 */
userSchema.pre('save', async function (next) {
    // Only hash if password is new or modified
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate salt (random string for hashing)
        const salt = await bcrypt.genSalt(10);

        // Hash the password with salt
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Method: Compare passwords
 * Used during login to verify if password is correct
 * 
 * Example:
 *   const user = await User.findById(userId).select('+password');
 *   const isMatch = await user.comparePassword(inputPassword);
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Create and export the User model
 * This model will be used to interact with users collection in MongoDB
 */
const User = mongoose.model('User', userSchema);

module.exports = User;