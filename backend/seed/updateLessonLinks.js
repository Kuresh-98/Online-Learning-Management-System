/**
 * Bulk update videoUrl and videoPublicId for all lessons
 * Usage: node updateLessonLinks.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Lesson = require('../models/lesson');

// Set your new base video URL and publicId pattern here
const CLOUD_NAME = 'dfsutsd9n'; // change if needed
const NEW_PUBLIC_ID = 'lms/videos/e9jgix1dz9ixp2mve41s'; // change if needed

(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const lessons = await Lesson.find({});
    for (const lesson of lessons) {
        lesson.videoUrl = `https://res.cloudinary.com/dfsutsd9n/video/upload/lms/videos/e9jgix1dz9ixp2mve41s.mp4`;
        lesson.videoPublicId = `lms/videos/e9jgix1dz9ixp2mve41s`;
        // If you want to update PDFs too, add:
        // lesson.documentUrl = 'YOUR_NEW_PDF_URL';
        // lesson.documentPublicId = 'YOUR_NEW_PDF_PUBLIC_ID';
        await lesson.save();
        console.log(`Updated lesson: ${lesson.title}`);
    }
    process.exit(0);
})();