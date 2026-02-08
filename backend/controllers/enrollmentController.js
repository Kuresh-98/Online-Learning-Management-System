const Enrollment = require('../models/enrollment');
const Course = require('../models/course');

/**
 * @desc    Enroll in a course
 * @route   POST /api/enrollments
 * @access  Private (Student)
 */
exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Validate course ID
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a course ID'
            });
        }

        // Check if course exists and is approved
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (course.status !== 'approved') {
            return res.status(400).json({
                success: false,
                message: 'This course is not available for enrollment'
            });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
            student: req.user.id,
            course: courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'You are already enrolled in this course'
            });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            student: req.user.id,
            course: courseId
        });

        // Increment course's enrolled count
        await Course.findByIdAndUpdate(courseId, {
            $inc: { enrolledCount: 1 }
        });

        // Populate student and course info
        await enrollment.populate('student', 'name email');
        await enrollment.populate('course', 'title description instructor');

        res.status(201).json({
            success: true,
            message: 'Successfully enrolled in course',
            data: enrollment
        });
    } catch (error) {
        console.error('Enroll Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error enrolling in course',
            error: error.message
        });
    }
};

/**
 * @desc    Get my enrollments (for logged-in student)
 * @route   GET /api/enrollments/my-courses
 * @access  Private (Student)
 */
exports.getMyEnrollments = async (req, res) => {
    try {
        const { status } = req.query; // Filter by status (active, completed, dropped)

        const filter = { student: req.user.id };
        if (status) {
            filter.status = status;
        }

        const enrollments = await Enrollment.find(filter)
            .populate('course', 'title description category level thumbnail instructor enrolledCount')
            .populate({
                path: 'course',
                populate: {
                    path: 'instructor',
                    select: 'name email profilePicture'
                }
            })
            .sort({ enrolledAt: -1 });

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        console.error('Get My Enrollments Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching enrollments',
            error: error.message
        });
    }
};

/**
 * @desc    Get single enrollment details
 * @route   GET /api/enrollments/:id
 * @access  Private (Student - own enrollment only)
 */
exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id)
            .populate('student', 'name email profilePicture')
            .populate({
                path: 'course',
                populate: [
                    { path: 'instructor', select: 'name email' },
                    { path: 'lessons', select: 'title order type isFree' }
                ]
            })
            .populate('completedLessons', 'title order');

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        // Check if user is the enrolled student
        if (enrollment.student._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this enrollment'
            });
        }

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        console.error('Get Enrollment Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching enrollment',
            error: error.message
        });
    }
};

/**
 * @desc    Mark lesson as completed
 * @route   PUT /api/enrollments/:id/complete-lesson
 * @access  Private (Student)
 */
exports.completeLesson = async (req, res) => {
    try {
        const { lessonId } = req.body;

        if (!lessonId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide lesson ID'
            });
        }

        let enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        // Check if user is the enrolled student
        if (enrollment.student.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this enrollment'
            });
        }

        // Use the model method to complete lesson
        enrollment = await enrollment.completeLessonMethod(lessonId);

        res.status(200).json({
            success: true,
            message: 'Lesson marked as completed',
            data: {
                progress: enrollment.progress,
                completedLessons: enrollment.completedLessons,
                status: enrollment.status
            }
        });
    } catch (error) {
        console.error('Complete Lesson Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error completing lesson',
            error: error.message
        });
    }
};

/**
 * @desc    Add review/rating to course
 * @route   PUT /api/enrollments/:id/review
 * @access  Private (Student)
 */
exports.addReview = async (req, res) => {
    try {
        const { rating, review } = req.body;

        if (!rating) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a rating'
            });
        }

        let enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        // Check if user is the enrolled student
        if (enrollment.student.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to review this enrollment'
            });
        }

        // Update review and rating
        enrollment.rating = rating;
        enrollment.review = review || '';
        await enrollment.save();

        // Update course rating (calculate average)
        const course = await Course.findById(enrollment.course);
        const allEnrollments = await Enrollment.find({
            course: enrollment.course,
            rating: { $ne: null }
        });

        const totalRating = allEnrollments.reduce((sum, e) => sum + e.rating, 0);
        course.rating = totalRating / allEnrollments.length;
        course.reviewCount = allEnrollments.length;
        await course.save();

        res.status(200).json({
            success: true,
            message: 'Review added successfully',
            data: enrollment
        });
    } catch (error) {
        console.error('Add Review Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding review',
            error: error.message
        });
    }
};

/**
 * @desc    Drop/unenroll from course
 * @route   DELETE /api/enrollments/:id
 * @access  Private (Student)
 */
exports.dropCourse = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        // Check if user is the enrolled student
        if (enrollment.student.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to drop this enrollment'
            });
        }

        // Mark as dropped instead of deleting
        enrollment.status = 'dropped';
        await enrollment.save();

        // Decrement course's enrolled count
        await Course.findByIdAndUpdate(enrollment.course, {
            $inc: { enrolledCount: -1 }
        });

        res.status(200).json({
            success: true,
            message: 'Successfully dropped from course'
        });
    } catch (error) {
        console.error('Drop Course Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error dropping course',
            error: error.message
        });
    }
};

/**
 * @desc    Get students enrolled in a course (for instructor)
 * @route   GET /api/enrollments/course/:courseId/students
 * @access  Private (Instructor)
 */
exports.getCourseStudents = async (req, res) => {
    try {
        // Check if course exists and user is the instructor
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this course students'
            });
        }

        const enrollments = await Enrollment.find({
            course: req.params.courseId,
            status: { $ne: 'dropped' }
        })
            .populate('student', 'name email profilePicture')
            .sort({ enrolledAt: -1 });

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        console.error('Get Course Students Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching students',
            error: error.message
        });
    }
};

/**
 * @desc    Get all students across all instructor's courses
 * @route   GET /api/enrollments/instructor/all-students
 * @access  Private (Instructor)
 */
exports.getInstructorAllStudents = async (req, res) => {
    try {
        // Get all courses by this instructor
        const instructorCourses = await Course.find({ instructor: req.user.id });
        const courseIds = instructorCourses.map(c => c._id);

        if (courseIds.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                data: []
            });
        }

        // Get all enrollments for instructor's courses
        const enrollments = await Enrollment.find({
            course: { $in: courseIds },
            status: { $ne: 'dropped' }
        })
            .populate('student', 'name email profilePicture')
            .populate('course', 'title')
            .sort({ enrolledAt: -1 });

        // Format the data
        const students = enrollments.map(enrollment => ({
            id: enrollment._id,
            name: enrollment.student?.name || 'Unknown',
            email: enrollment.student?.email || '',
            profilePicture: enrollment.student?.profilePicture,
            courseId: enrollment.course?._id,
            courseName: enrollment.course?.title || 'Unknown Course',
            progress: enrollment.progress || 0,
            enrolledDate: enrollment.enrolledAt,
            lastActive: enrollment.lastAccessedAt || enrollment.enrolledAt,
            status: enrollment.status
        }));

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error('Get Instructor Students Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching students',
            error: error.message
        });
    }
};

/**
 * @desc    Get total enrollment count (Admin only)
 * @route   GET /api/enrollments/admin/stats
 * @access  Private (Admin)
 */
exports.getEnrollmentStats = async (req, res) => {
    try {
        const totalEnrollments = await Enrollment.countDocuments({ status: { $ne: 'dropped' } });
        const activeEnrollments = await Enrollment.countDocuments({ status: 'active' });
        const completedEnrollments = await Enrollment.countDocuments({ status: 'completed' });

        res.status(200).json({
            success: true,
            data: {
                total: totalEnrollments,
                active: activeEnrollments,
                completed: completedEnrollments
            }
        });
    } catch (error) {
        console.error('Get Enrollment Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching enrollment stats',
            error: error.message
        });
    }
};