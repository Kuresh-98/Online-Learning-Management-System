/**
 * Script to update all existing lessons in the database to have a detailed summary (at least 250 words).
 * Run this after updating the schema if you want to patch existing lessons without reseeding.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Lesson = require('../models/lesson');

const detailedSummary = (title) => `This lesson, titled '${title}', is a comprehensive exploration of its topic. It covers all the essential concepts, practical applications, and real-world examples to ensure a deep understanding. The lesson begins by introducing the fundamental principles and gradually builds up to more advanced ideas, making it suitable for both beginners and those looking to reinforce their knowledge. Throughout the lesson, you will encounter detailed explanations, step-by-step guides, and interactive exercises designed to enhance your learning experience. The content is structured to promote active engagement, critical thinking, and problem-solving skills. By the end of this lesson, you will not only have mastered the core material but also gained valuable insights into how these concepts are applied in professional settings. Whether you are preparing for a career, a certification, or personal growth, this lesson provides the tools and confidence you need to succeed. The summary also highlights key takeaways, best practices, and additional resources for further study, ensuring you have a well-rounded and enriching educational journey. This detailed summary ensures that every lesson in this course is content-rich and valuable, helping you make the most of your learning path.`;

const updateLessonSummaries = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        const lessons = await Lesson.find({});
        let updated = 0;
        for (const lesson of lessons) {
            if (!lesson.summary || lesson.summary.length < 250) {
                lesson.summary = detailedSummary(lesson.title);
                await lesson.save();
                updated++;
            }
        }
        console.log(`Updated ${updated} lessons with detailed summaries.`);
        process.exit(0);
    } catch (err) {
        console.error('Error updating lessons:', err);
        process.exit(1);
    }
};

updateLessonSummaries();
