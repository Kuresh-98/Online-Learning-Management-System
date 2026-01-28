const mongoose = require('mongoose');

/**
 * Course Schema - Defines the structure of courses in MongoDB
 * 
 * Fields:
 * - title: Course name
 * - description: What the course is about
 * - instructor: Reference to User (who created it)
 * - category: Course category (Programming, Design, etc.)
 * - level: Beginner, Intermediate, Advanced
 * - price: Course price (0 for free)
 * - thumbnail: Course cover image URL
 * - status: pending, approved, or rejected
 * - lessons: Array of lesson IDs
 * - students: Number of enrolled students
 * - rating: Average course rating
 * - createdAt: When course was created
 */

const courseSchema = new mongoose.Schema(
    {
        // Course title
        title: {
            type: String,
            required: [true, 'Please provide a course title'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters']
        },

        // Course description
        description: {
            type: String,
            required: [true, 'Please provide a course description'],
            maxlength: [5000, 'Description cannot exceed 5000 characters']
        },

        // Instructor (Reference to User model)
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Course must have an instructor']
        },

        // Course category
        category: {
            type: String,
            enum: ['Programming', 'Design', 'Business', 'Marketing', 'Data Science', 'Other'],
            default: 'Other'
        },

        // Difficulty level
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            default: 'Beginner'
        },

        // Course price (0 = free)
        price: {
            type: Number,
            default: 0,
            min: [0, 'Price cannot be negative']
        },

        // Thumbnail/cover image URL (from Cloudinary)
        thumbnail: {
            type: String,
            default: null
        },

        // Course approval status
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },

        // Rejection reason (if admin rejects)
        rejectionReason: {
            type: String,
            default: null
        },

        // Array of lesson IDs (we'll populate this in Step 9)
        lessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson'
            }
        ],

        // Number of enrolled students (for quick access)
        enrolledCount: {
            type: Number,
            default: 0
        },

        // Average rating (from student reviews)
        rating: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot be more than 5']
        },

        // Number of reviews
        reviewCount: {
            type: Number,
            default: 0
        },

        // Is course published/visible to students?
        isPublished: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt
    }
);

/**
 * Index for better query performance
 * Speed up finding courses by instructor
 */
courseSchema.index({ instructor: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ category: 1 });

/**
 * Create and export the Course model
 */
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;