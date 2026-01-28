const express = require('express');
const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getInstructorCourses,
    getPendingCourses,
    approveCourse,
    rejectCourse
} = require('../controllers/courseController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * Course Routes
 * 
 * Public routes (no auth needed)
 * GET    /api/courses              - Get all approved courses
 * GET    /api/courses/:id          - Get single course
 * 
 * Instructor routes (protected + instructor role)
 * POST   /api/courses              - Create course
 * PUT    /api/courses/:id          - Update own course
 * DELETE /api/courses/:id          - Delete own course
 * GET    /api/courses/instructor/my-courses - Get my courses
 * 
 * Admin routes (protected + admin role)
 * GET    /api/courses/admin/pending        - Get pending courses
 * PATCH  /api/courses/:id/approve         - Approve course
 * PATCH  /api/courses/:id/reject          - Reject course
 */

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Instructor routes (MUST be before /:id)
router.get('/instructor/my-courses', protect, authorize('instructor', 'admin'), getInstructorCourses);

// Admin routes (MUST be before /:id)
router.get('/admin/pending', protect, authorize('admin'), getPendingCourses);

// Protected routes - Instructor/Admin only
router.post('/', protect, authorize('instructor', 'admin'), createCourse);
router.put('/:id', protect, authorize('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteCourse);

// Protected routes - Admin only

router.patch('/:id/approve', protect, authorize('admin'), approveCourse);
router.patch('/:id/reject', protect, authorize('admin'), rejectCourse);

module.exports = router;