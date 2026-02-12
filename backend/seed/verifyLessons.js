/**
 * Script to verify all lessons and their course assignments
 * Usage: node verifyLessons.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Course = require('../models/course');
const Lesson = require('../models/lesson');

const verifyLessons = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const lessons = await Lesson.find({}).populate('course', 'title');
        if (!lessons.length) {
            console.log('No lessons found.');
            process.exit(0);
        }

        console.log('Lesson List:');
        lessons.forEach((lesson, idx) => {
            console.log(`\n${idx + 1}. Lesson: ${lesson.title}`);
            console.log(`   Type: ${lesson.type}`);
            console.log(`   Course ID: ${lesson.course?._id || 'N/A'}`);
            console.log(`   Course Title: ${lesson.course?.title || 'N/A'}`);
            console.log(`   Order: ${lesson.order}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error verifying lessons:', err);
        process.exit(1);
    }
};

verifyLessons();
