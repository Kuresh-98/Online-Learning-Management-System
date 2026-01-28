const express = require('express');
const {
    getLessonsByCourse,
    getLessonById,
    createVideoLesson,
    createDocumentLesson,
    updateLesson,
    deleteLesson
} = require('../controllers/lessonController');

const { protect, authorize } = require('../middleware/auth');
const { uploadVideo, uploadDocument } = require('../config/cloudinary');

const router = express.Router();

/**
 * Lesson Routes
 * 
 * Public routes
 * GET    /api/lessons/course/:courseId  - Get all lessons for a course
 * GET    /api/lessons/:id               - Get single lesson
 * 
 * Instructor routes (protected + instructor role)
 * POST   /api/lessons/video             - Upload video lesson
 * POST   /api/lessons/document          - Upload document lesson
 * PUT    /api/lessons/:id               - Update lesson
 * DELETE /api/lessons/:id               - Delete lesson
 */

// Public routes
router.get('/course/:courseId', getLessonsByCourse);
router.get('/:id', getLessonById);

// Protected routes - Instructor only
router.post(
    '/video',
    protect,
    authorize('instructor', 'admin'),
    uploadVideo.single('video'), // Multer middleware for video upload
    createVideoLesson
);

router.post(
    '/document',
    protect,
    authorize('instructor', 'admin'),
    uploadDocument.single('document'), // Multer middleware for document upload
    createDocumentLesson
);

router.put('/:id', protect, authorize('instructor', 'admin'), updateLesson);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteLesson);

module.exports = router;