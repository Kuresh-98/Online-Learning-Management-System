const Lesson = require('../models/lesson');
const Course = require('../models/course');
const { deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @desc    Get all lessons for a course
 * @route   GET /api/lessons/course/:courseId
 * @access  Public (only published if not enrolled)
 */
exports.getLessonsByCourse = async (req, res) => {
    try {
        const lessons = await Lesson.find({ course: req.params.courseId })
            .sort({ order: 1 }); // Sort by lesson order

        res.status(200).json({
            success: true,
            count: lessons.length,
            data: lessons
        });
    } catch (error) {
        console.error('Get Lessons Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching lessons',
            error: error.message
        });
    }
};

/**
 * @desc    Get single lesson by ID
 * @route   GET /api/lessons/:id
 * @access  Public (with restrictions)
 */
exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id)
            .populate('course', 'title instructor');

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        res.status(200).json({
            success: true,
            data: lesson
        });
    } catch (error) {
        console.error('Get Lesson Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching lesson',
            error: error.message
        });
    }
};

/**
 * @desc    Create lesson with video upload
 * @route   POST /api/lessons/video
 * @access  Private (Instructor)
 */
exports.createVideoLesson = async (req, res) => {
    try {
        const { title, description, courseId, order, isFree, duration } = req.body;

        // Validate required fields
        if (!title || !courseId || !order) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title, courseId, and order'
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a video file'
            });
        }

        // Verify course exists and user is the instructor
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to add lessons to this course'
            });
        }

        // Create lesson with Cloudinary video URL
        const lesson = await Lesson.create({
            title,
            description: description || '',
            course: courseId,
            type: 'video',
            videoUrl: req.file.path, // Cloudinary URL
            videoPublicId: req.file.filename, // Cloudinary public_id
            duration: duration || 0,
            order: parseInt(order),
            isFree: isFree === 'true' || isFree === true
        });

        // Add lesson to course's lessons array
        course.lessons.push(lesson._id);
        await course.save();

        res.status(201).json({
            success: true,
            message: 'Video lesson created successfully',
            data: lesson
        });
    } catch (error) {
        console.error('Create Video Lesson Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating video lesson',
            error: error.message
        });
    }
};

/**
 * @desc    Create lesson with document/PDF upload
 * @route   POST /api/lessons/document
 * @access  Private (Instructor)
 */
exports.createDocumentLesson = async (req, res) => {
    try {
        const { title, description, courseId, order, isFree } = req.body;

        // Validate required fields
        if (!title || !courseId || !order) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title, courseId, and order'
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a document file'
            });
        }

        // Verify course exists and user is the instructor
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to add lessons to this course'
            });
        }

        // Create lesson with Cloudinary document URL
        const lesson = await Lesson.create({
            title,
            description: description || '',
            course: courseId,
            type: 'document',
            documentUrl: req.file.path, // Cloudinary URL
            documentPublicId: req.file.filename, // Cloudinary public_id
            order: parseInt(order),
            isFree: isFree === 'true' || isFree === true
        });

        // Add lesson to course's lessons array
        course.lessons.push(lesson._id);
        await course.save();

        res.status(201).json({
            success: true,
            message: 'Document lesson created successfully',
            data: lesson
        });
    } catch (error) {
        console.error('Create Document Lesson Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating document lesson',
            error: error.message
        });
    }
};

/**
 * @desc    Update lesson
 * @route   PUT /api/lessons/:id
 * @access  Private (Instructor)
 */
exports.updateLesson = async (req, res) => {
    try {
        let lesson = await Lesson.findById(req.params.id).populate('course');

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        // Check if user is the course instructor
        if (lesson.course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this lesson'
            });
        }

        // Update fields
        const { title, description, order, isFree, duration } = req.body;

        if (title) lesson.title = title;
        if (description !== undefined) lesson.description = description;
        if (order) lesson.order = parseInt(order);
        if (isFree !== undefined) lesson.isFree = isFree === 'true' || isFree === true;
        if (duration) lesson.duration = duration;

        lesson = await lesson.save();

        res.status(200).json({
            success: true,
            message: 'Lesson updated successfully',
            data: lesson
        });
    } catch (error) {
        console.error('Update Lesson Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating lesson',
            error: error.message
        });
    }
};

/**
 * @desc    Delete lesson
 * @route   DELETE /api/lessons/:id
 * @access  Private (Instructor)
 */
exports.deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('course');

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        // Check if user is the course instructor
        if (lesson.course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this lesson'
            });
        }

        // Delete video/document from Cloudinary
        if (lesson.videoPublicId) {
            await deleteFromCloudinary(lesson.videoPublicId, 'video');
        }
        if (lesson.documentPublicId) {
            await deleteFromCloudinary(lesson.documentPublicId, 'raw');
        }

        // Remove lesson from course's lessons array
        await Course.findByIdAndUpdate(lesson.course._id, {
            $pull: { lessons: lesson._id }
        });

        // Delete lesson from database
        await Lesson.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Lesson deleted successfully'
        });
    } catch (error) {
        console.error('Delete Lesson Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting lesson',
            error: error.message
        });
    }
};