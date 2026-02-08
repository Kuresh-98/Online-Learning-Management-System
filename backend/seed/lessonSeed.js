/**
 * Lesson Seed Script
 * Adds sample lessons to courses
 * 
 * Note: Run courseSeed.js first to create courses
 * Usage: node seed/lessonSeed.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Course = require('../models/course');
const Lesson = require('../models/lesson');

// Sample lessons for each course type
const lessonTemplates = {
    'Complete Web Development Bootcamp 2026': [
        { title: 'Introduction to Web Development', description: 'Overview of web development, career paths, and course structure. Learn about frontend, backend, and full-stack development.', type: 'video', duration: 15, isFree: true },
        { title: 'HTML Fundamentals', description: 'Learn HTML tags, elements, attributes, and document structure. Build your first webpage from scratch.', type: 'video', duration: 45, isFree: true },
        { title: 'CSS Styling Basics', description: 'Master CSS selectors, properties, colors, fonts, and layouts. Make your webpages beautiful.', type: 'video', duration: 50, isFree: false },
        { title: 'CSS Flexbox & Grid', description: 'Modern CSS layout techniques using Flexbox and CSS Grid. Create responsive layouts with ease.', type: 'video', duration: 60, isFree: false },
        { title: 'JavaScript Fundamentals', description: 'Variables, data types, operators, conditionals, and loops. Start programming with JavaScript.', type: 'video', duration: 55, isFree: false },
        { title: 'JavaScript DOM Manipulation', description: 'Select elements, handle events, and dynamically update web pages. Make your sites interactive.', type: 'video', duration: 45, isFree: false },
        { title: 'React.js Introduction', description: 'Components, JSX, props, and state. Build modern user interfaces with React.', type: 'video', duration: 60, isFree: false },
        { title: 'Node.js & Express Setup', description: 'Set up a backend server with Node.js and Express. Handle routes and middleware.', type: 'video', duration: 50, isFree: false },
    ],
    'Advanced React & Redux Masterclass': [
        { title: 'React Hooks Deep Dive', description: 'useState, useEffect, useContext, useReducer, and custom hooks explained in depth.', type: 'video', duration: 60, isFree: true },
        { title: 'Context API Advanced Patterns', description: 'State management with Context API, performance optimization, and best practices.', type: 'video', duration: 45, isFree: true },
        { title: 'Redux Fundamentals', description: 'Actions, reducers, store, and the Redux flow. Understand predictable state management.', type: 'video', duration: 55, isFree: false },
        { title: 'Redux Toolkit Essentials', description: 'Simplified Redux development with Redux Toolkit. createSlice, createAsyncThunk, and RTK Query.', type: 'video', duration: 65, isFree: false },
        { title: 'React Performance Optimization', description: 'React.memo, useMemo, useCallback, code splitting, and lazy loading for fast apps.', type: 'video', duration: 50, isFree: false },
        { title: 'Testing React Applications', description: 'Unit testing with Jest and React Testing Library. Write reliable, maintainable tests.', type: 'video', duration: 55, isFree: false },
    ],
    'Node.js Backend Development': [
        { title: 'Node.js Environment Setup', description: 'Install Node.js, understand npm, and set up your development environment.', type: 'video', duration: 20, isFree: true },
        { title: 'Express.js Fundamentals', description: 'Create routes, handle requests, use middleware, and understand the Express framework.', type: 'video', duration: 50, isFree: true },
        { title: 'RESTful API Design', description: 'Design principles, HTTP methods, status codes, and building professional APIs.', type: 'video', duration: 45, isFree: false },
        { title: 'MongoDB Integration', description: 'Connect to MongoDB, create schemas with Mongoose, and perform CRUD operations.', type: 'video', duration: 55, isFree: false },
        { title: 'Authentication with JWT', description: 'Implement user registration, login, and protected routes using JSON Web Tokens.', type: 'video', duration: 60, isFree: false },
        { title: 'File Uploads with Multer', description: 'Handle file uploads, validate files, and integrate with cloud storage.', type: 'video', duration: 40, isFree: false },
    ],
    'Python for Data Science & Machine Learning': [
        { title: 'Python Basics for Data Science', description: 'Python syntax, data types, functions, and libraries essential for data science.', type: 'video', duration: 45, isFree: true },
        { title: 'NumPy Fundamentals', description: 'Arrays, operations, broadcasting, and numerical computing with NumPy.', type: 'video', duration: 50, isFree: true },
        { title: 'Pandas Data Analysis', description: 'DataFrames, data cleaning, filtering, grouping, and data manipulation with Pandas.', type: 'video', duration: 60, isFree: false },
        { title: 'Data Visualization with Matplotlib', description: 'Create charts, plots, and visualizations to communicate insights effectively.', type: 'video', duration: 45, isFree: false },
        { title: 'Machine Learning with Scikit-learn', description: 'Regression, classification, clustering, and model evaluation with Scikit-learn.', type: 'video', duration: 70, isFree: false },
        { title: 'Introduction to TensorFlow', description: 'Neural networks, deep learning basics, and building models with TensorFlow.', type: 'video', duration: 65, isFree: false },
    ],
    'UI/UX Design Fundamentals': [
        { title: 'Introduction to UI/UX Design', description: 'Understand the difference between UI and UX, career paths, and design thinking methodology.', type: 'video', duration: 25, isFree: true },
        { title: 'Figma Basics', description: 'Navigate Figma, create frames, use tools, and set up your design workflow.', type: 'video', duration: 40, isFree: true },
        { title: 'Design Principles', description: 'Color theory, typography, spacing, hierarchy, and visual design fundamentals.', type: 'video', duration: 50, isFree: false },
        { title: 'Wireframing Techniques', description: 'Create low-fidelity wireframes to plan and communicate design ideas quickly.', type: 'video', duration: 35, isFree: false },
        { title: 'Prototyping in Figma', description: 'Add interactions, transitions, and create clickable prototypes for user testing.', type: 'video', duration: 45, isFree: false },
        { title: 'Design Systems', description: 'Build reusable components, style guides, and maintain design consistency at scale.', type: 'video', duration: 55, isFree: false },
    ],
    'Digital Marketing Complete Course': [
        { title: 'Digital Marketing Overview', description: 'Understand the digital marketing landscape, channels, and career opportunities.', type: 'video', duration: 20, isFree: true },
        { title: 'SEO Fundamentals', description: 'On-page SEO, off-page SEO, keyword research, and ranking on search engines.', type: 'video', duration: 55, isFree: true },
        { title: 'Google Ads Mastery', description: 'Create search ads, display ads, set budgets, and optimize campaigns for ROI.', type: 'video', duration: 60, isFree: false },
        { title: 'Social Media Marketing', description: 'Strategies for Facebook, Instagram, LinkedIn, and Twitter marketing.', type: 'video', duration: 50, isFree: false },
        { title: 'Email Marketing', description: 'Build email lists, create campaigns, write compelling copy, and automate workflows.', type: 'video', duration: 40, isFree: false },
        { title: 'Analytics & Reporting', description: 'Google Analytics, tracking conversions, measuring ROI, and data-driven decisions.', type: 'video', duration: 45, isFree: false },
    ],
    'Business Analytics with Excel & SQL': [
        { title: 'Excel for Business Analysis', description: 'Essential Excel functions, formulas, and features for business professionals.', type: 'video', duration: 35, isFree: true },
        { title: 'Advanced Excel Formulas', description: 'VLOOKUP, INDEX-MATCH, IF statements, and nested formulas for complex analysis.', type: 'video', duration: 50, isFree: true },
        { title: 'Pivot Tables Mastery', description: 'Summarize large datasets, create reports, and derive insights with pivot tables.', type: 'video', duration: 45, isFree: false },
        { title: 'SQL Fundamentals', description: 'SELECT, WHERE, JOIN, GROUP BY - query databases like a professional analyst.', type: 'video', duration: 55, isFree: false },
        { title: 'Data Visualization in Excel', description: 'Create professional charts, dashboards, and visual reports for stakeholders.', type: 'video', duration: 40, isFree: false },
    ],
};

const seedLessons = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        let lessonsCreated = 0;
        let lessonsSkipped = 0;

        // Get all courses
        const courses = await Course.find({});

        if (courses.length === 0) {
            console.log('No courses found. Please run courseSeed.js first.');
            process.exit(1);
        }

        for (const course of courses) {
            const lessons = lessonTemplates[course.title];

            if (!lessons) {
                console.log(`No lesson template for: ${course.title}`);
                continue;
            }

            // Check if lessons already exist for this course
            const existingLessons = await Lesson.countDocuments({ course: course._id });
            if (existingLessons > 0) {
                console.log(`Lessons already exist for: ${course.title} (${existingLessons} lessons)`);
                lessonsSkipped += lessons.length;
                continue;
            }

            // Create lessons
            for (let i = 0; i < lessons.length; i++) {
                const lessonData = {
                    ...lessons[i],
                    course: course._id,
                    order: i + 1,
                    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' // Placeholder
                };

                await Lesson.create(lessonData);
                lessonsCreated++;
            }
            console.log(`Created ${lessons.length} lessons for: ${course.title}`);
        }

        console.log('\n========================================');
        console.log('Lesson seeding completed!');
        console.log('========================================');
        console.log(`Lessons created: ${lessonsCreated}`);
        console.log(`Lessons skipped: ${lessonsSkipped}`);
        console.log('========================================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding lessons:', error);
        process.exit(1);
    }
};

seedLessons();
