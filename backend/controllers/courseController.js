const Course = require('../models/course');

/**
 * @desc    Get all approved courses (for students to browse)
 * @route   GET /api/courses
 * @access  Public
 */
exports.getAllCourses = async (req, res) => {
    try {
        // Build query
        let query = { status: 'approved', isPublished: true };

        // Filter by category
        if (req.query.category && req.query.category !== 'All Categories') {
            query.category = req.query.category;
        }

        // Filter by level
        if (req.query.level && req.query.level !== 'All Levels') {
            query.level = req.query.level.charAt(0).toUpperCase() + req.query.level.slice(1);
        }

        // Build sort
        let sortOption = { createdAt: -1 }; // default: newest
        if (req.query.sort === 'popular') {
            sortOption = { enrolledCount: -1 };
        } else if (req.query.sort === 'rating') {
            sortOption = { rating: -1 };
        } else if (req.query.sort === 'title') {
            sortOption = { title: 1 };
        }

        const courses = await Course.find(query)
            .populate('instructor', 'name email profilePicture')
            .sort(sortOption);

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Get Courses Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
};

/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 * @access  Public
 */
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email profilePicture bio')
        // .populate('lessons');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Get Course Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching course',
            error: error.message
        });
    }
};

/**
 * @desc    Create a new course (Instructor only)
 * @route   POST /api/courses
 * @access  Private (Instructor)
 */
exports.createCourse = async (req, res) => {
    try {
        const { title, description, category, level, price } = req.body;

        // Validation
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title and description'
            });
        }

        // Create course with current user as instructor
        const course = await Course.create({
            title,
            description,
            category: category || 'Other',
            level: level || 'Beginner',
            price: price || 0,
            instructor: req.user.id // From auth middleware
        });

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: course
        });
    } catch (error) {
        console.error('Create Course Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating course',
            error: error.message
        });
    }
};

/**
 * @desc    Update course (Instructor only - only their own courses)
 * @route   PUT /api/courses/:id
 * @access  Private (Instructor)
 */
exports.updateCourse = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if user is the instructor
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this course'
            });
        }

        // Update fields
        const { title, description, category, level, price, thumbnail } = req.body;

        if (title) course.title = title;
        if (description) course.description = description;
        if (category) course.category = category;
        if (level) course.level = level;
        if (price !== undefined) course.price = price;
        if (thumbnail) course.thumbnail = thumbnail;

        course = await course.save();

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: course
        });
    } catch (error) {
        console.error('Update Course Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating course',
            error: error.message
        });
    }
};

/**
 * @desc    Delete course (Instructor only)
 * @route   DELETE /api/courses/:id
 * @access  Private (Instructor)
 */
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if user is the instructor
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this course'
            });
        }

        await Course.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Delete Course Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting course',
            error: error.message
        });
    }
};

/**
 * @desc    Get instructor's courses
 * @route   GET /api/courses/instructor/my-courses
 * @access  Private (Instructor)
 */
exports.getInstructorCourses = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user.id })
            // .populate('lessons');
            .populate('instructor', 'name email profilePicture');

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Get Instructor Courses Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
};

/**
 * @desc    Get pending courses (Admin only)
 * @route   GET /api/courses/admin/pending
 * @access  Private (Admin)
 */
exports.getPendingCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: 'pending' })
            .populate('instructor', 'name email');

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Get Pending Courses Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching pending courses',
            error: error.message
        });
    }
};

/**
 * @desc    Approve course (Admin only)
 * @route   PATCH /api/courses/:id/approve
 * @access  Private (Admin)
 */
exports.approveCourse = async (req, res) => {
    try {
        let course = await Course.findByIdAndUpdate(
            req.params.id,
            {
                status: 'approved',
                isPublished: true
            },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Course approved successfully',
            data: course
        });
    } catch (error) {
        console.error('Approve Course Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error approving course',
            error: error.message
        });
    }
};

/**
 * @desc    Reject course (Admin only)
 * @route   PATCH /api/courses/:id/reject
 * @access  Private (Admin)
 */
exports.rejectCourse = async (req, res) => {
    try {
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({
                success: false,
                message: 'Please provide rejection reason'
            });
        }

        let course = await Course.findByIdAndUpdate(
            req.params.id,
            {
                status: 'rejected',
                rejectionReason: reason,
                isPublished: false
            },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Course rejected',
            data: course
        });
    } catch (error) {
        console.error('Reject Course Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error rejecting course',
            error: error.message
        });
    }
};