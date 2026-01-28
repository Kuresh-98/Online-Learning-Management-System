const mongoose = require('mongoose');

/**
 * Enrollment Schema - Defines the structure of student enrollments in MongoDB
 * 
 * This is a junction/bridge collection that connects:
 * - Students (User) to Courses
 * - Tracks enrollment date and progress
 * 
 * Fields:
 * - student: Reference to User (enrolled student)
 * - course: Reference to Course (enrolled course)
 * - enrolledAt: When student enrolled
 * - progress: Percentage of course completed
 * - completedLessons: Array of completed lesson IDs
 * - status: active, completed, or dropped
 */

const enrollmentSchema = new mongoose.Schema(
    {
        // Student (Reference to User model)
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Enrollment must have a student']
        },

        // Course (Reference to Course model)
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Enrollment must have a course']
        },

        // Enrollment date
        enrolledAt: {
            type: Date,
            default: Date.now
        },

        // Completion progress (0-100%)
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        // Array of completed lesson IDs
        completedLessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson'
            }
        ],

        // Enrollment status
        status: {
            type: String,
            enum: ['active', 'completed', 'dropped'],
            default: 'active'
        },

        // Course completion date (when progress reaches 100%)
        completedAt: {
            type: Date,
            default: null
        },

        // Last accessed date
        lastAccessedAt: {
            type: Date,
            default: Date.now
        },

        // Student's rating for the course (1-5)
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: null
        },

        // Student's review/feedback for the course
        review: {
            type: String,
            maxlength: [1000, 'Review cannot exceed 1000 characters'],
            default: null
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt
    }
);

/**
 * Indexes for better query performance
 */
// Find all enrollments for a specific student
enrollmentSchema.index({ student: 1 });

// Find all enrollments for a specific course
enrollmentSchema.index({ course: 1 });

// Find enrollment by both student and course (must be unique)
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

// Find active enrollments
enrollmentSchema.index({ status: 1 });

/**
 * Middleware: Prevent duplicate enrollments
 * Student cannot enroll in same course twice
 */
enrollmentSchema.pre('save', async function (next) {
    // Only check for new documents
    if (this.isNew) {
        const existingEnrollment = await mongoose.model('Enrollment').findOne({
            student: this.student,
            course: this.course
        });

        if (existingEnrollment) {
            throw new Error('Student is already enrolled in this course');
        }
    }

    next();
});

/**
 * Method: Mark lesson as completed
 * @param {String} lessonId - Lesson ID to mark as completed
 */
enrollmentSchema.methods.completeLessonMethod = async function (lessonId) {
    // Add lesson to completedLessons if not already there
    if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId);
    }

    // Get total lessons for this course
    const course = await mongoose.model('Course').findById(this.course)
        .populate('lessons');

    // Calculate progress
    const totalLessons = course.lessons.length;
    const completedCount = this.completedLessons.length;
    this.progress = Math.round((completedCount / totalLessons) * 100);

    // Mark as completed if all lessons done
    if (this.progress === 100 && this.status !== 'completed') {
        this.status = 'completed';
        this.completedAt = new Date();
    }

    this.lastAccessedAt = new Date();
    return await this.save();
};

/**
 * Create and export the Enrollment model
 */
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;