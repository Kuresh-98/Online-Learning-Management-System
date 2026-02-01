const express = require('express');
const {
    enrollInCourse,
    getMyEnrollments,
    getEnrollmentById,
    completeLesson,
    addReview,
    dropCourse,
    getCourseStudents
} = require('../controllers/enrollmentController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * Enrollment Routes
 * 
 * Student routes (protected + student role)
 * POST   /api/enrollments                      - Enroll in course
 * GET    /api/enrollments/my-courses           - Get my enrollments
 * GET    /api/enrollments/:id                  - Get single enrollment
 * PUT    /api/enrollments/:id/complete-lesson  - Mark lesson completed
 * PUT    /api/enrollments/:id/review           - Add review/rating
 * DELETE /api/enrollments/:id                  - Drop course
 * 
 * Instructor routes (protected + instructor role)
 * GET    /api/enrollments/course/:courseId/students - Get course students
 */

// Student routes
router.post('/', protect, authorize('student'), enrollInCourse);
router.get('/my-courses', protect, authorize('student'), getMyEnrollments);
router.get('/:id', protect, authorize('student'), getEnrollmentById);
router.put('/:id/complete-lesson', protect, authorize('student'), completeLesson);
router.put('/:id/review', protect, authorize('student'), addReview);
router.delete('/:id', protect, authorize('student'), dropCourse);

// Instructor routes
router.get('/course/:courseId/students', protect, authorize('instructor', 'admin'), getCourseStudents);

module.exports = router;