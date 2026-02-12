// backend/seed/fixCourseLessons.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Course = require('../models/course');
const Lesson = require('../models/lesson');

(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const courses = await Course.find({});
    for (const course of courses) {
        const lessons = await Lesson.find({ course: course._id });
        course.lessons = lessons.map(l => l._id);
        await course.save();
        console.log(`Updated lessons for course: ${course.title}`);
    }
    process.exit(0);
})();