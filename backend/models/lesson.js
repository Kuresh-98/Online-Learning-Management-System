const mongoose = require('mongoose');

/**
 * Lesson Schema - Defines the structure of lessons in MongoDB
 * 
 * Fields:
 * - title: Lesson name
 * - description: What the lesson covers
 * - course: Reference to Course (which course this lesson belongs to)
 * - type: video or document (PDF)
 * - videoUrl: Cloudinary video URL
 * - documentUrl: Cloudinary PDF URL
 * - duration: Video duration in minutes
 * - order: Lesson sequence number (1, 2, 3...)
 * - isFree: Can students preview without enrolling?
 */

const lessonSchema = new mongoose.Schema(
    {
        // Lesson title
        title: {
            type: String,
            required: [true, 'Please provide a lesson title'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters']
        },

        // Lesson description
        description: {
            type: String,
            maxlength: [2000, 'Description cannot exceed 2000 characters']
        },
        // Video summary
        summary: {
            type: String,
            default: '',
            maxlength: 20000
        },

        // Course reference (which course this lesson belongs to)
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Lesson must belong to a course']
        },

        // Lesson type
        type: {
            type: String,
            enum: ['video', 'document'],
            required: [true, 'Please specify lesson type']
        },

        // Video URL from Cloudinary (if type is video)
        videoUrl: {
            type: String,
            default: null
        },

        // Cloudinary public_id for video (for deletion)
        videoPublicId: {
            type: String,
            default: null
        },

        // Document/PDF URL from Cloudinary (if type is document)
        documentUrl: {
            type: String,
            default: null
        },

        // Cloudinary public_id for document (for deletion)
        documentPublicId: {
            type: String,
            default: null
        },

        // Video duration in minutes (optional)
        duration: {
            type: Number,
            default: 0
        },

        // Lesson order/sequence in the course
        order: {
            type: Number,
            required: [true, 'Please provide lesson order'],
            min: 1
        },

        // Is this lesson free to preview?
        isFree: {
            type: Boolean,
            default: false
        },

        // Thumbnail for video (optional)
        thumbnail: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt
    }
);

/**
 * Index for better query performance
 * Speed up finding lessons by course
 */
lessonSchema.index({ course: 1 });
lessonSchema.index({ order: 1 });

/**
 * Create and export the Lesson model
 */
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;