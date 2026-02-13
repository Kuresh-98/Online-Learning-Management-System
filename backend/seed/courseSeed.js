/**
 * Course Seed Script
 * Adds sample courses with genuine data
 * 
 * Usage: node seed/courseSeed.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Course = require('../models/course');

// Sample instructor data
const instructors = [
    {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@learnify.com',
        password: 'Instructor@123',
        role: 'instructor'
    },
    {
        name: 'Priya Patel',
        email: 'priya.patel@learnify.com',
        password: 'Instructor@123',
        role: 'instructor'
    },
    {
        name: 'Amit Kumar',
        email: 'amit.kumar@learnify.com',
        password: 'Instructor@123',
        role: 'instructor'
    }
];

// Genuine course data
const coursesData = [
    {
        title: 'Complete Web Development Bootcamp 2026',
        description: 'Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and MongoDB. You will build real-world projects including a blog, e-commerce site, and social media application. Perfect for beginners who want to become full-stack developers. Includes 50+ hours of video content, coding exercises, and downloadable resources.',
        category: 'Programming',
        level: 'Beginner',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        status: 'approved',
        enrolledCount: 342,
        rating: 4.7,
        reviewCount: 89,
        isPublished: true,
        instructorIndex: 0
    },
    {
        title: 'Advanced React & Redux Masterclass',
        description: 'Take your React skills to the next level. Master advanced concepts like Context API, custom hooks, Redux Toolkit, performance optimization, and testing. Learn to build scalable applications with best practices used by top companies. Includes real-world projects and interview preparation material.',
        category: 'Programming',
        level: 'Advanced',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800',
        status: 'approved',
        enrolledCount: 218,
        rating: 4.8,
        reviewCount: 56,
        isPublished: true,
        instructorIndex: 0
    },
    {
        title: 'Node.js Backend Development',
        description: 'Build powerful backend applications with Node.js and Express. Learn RESTful API design, authentication with JWT, database integration with MongoDB and PostgreSQL, file uploads, payment integration, and deployment. This course prepares you for backend developer roles at tech companies.',
        category: 'Programming',
        level: 'Intermediate',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
        status: 'approved',
        enrolledCount: 189,
        rating: 4.5,
        reviewCount: 45,
        isPublished: true,
        instructorIndex: 1
    },
    {
        title: 'Python for Data Science & Machine Learning',
        description: 'Learn Python programming and apply it to data science and machine learning. Cover NumPy, Pandas, Matplotlib, Scikit-learn, and TensorFlow. Work on real datasets to solve business problems. This course bridges the gap between theory and practical application in the field of AI.',
        category: 'Data Science',
        level: 'Intermediate',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
        status: 'approved',
        enrolledCount: 276,
        rating: 4.6,
        reviewCount: 72,
        isPublished: true,
        instructorIndex: 1
    },
    {
        title: 'UI/UX Design Fundamentals',
        description: 'Master the principles of user interface and user experience design. Learn to use Figma, create wireframes, prototypes, and design systems. Understand user research, accessibility, and design thinking methodology. Build a professional portfolio with 5 complete projects.',
        category: 'Design',
        level: 'Beginner',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
        status: 'approved',
        enrolledCount: 156,
        rating: 4.6,
        reviewCount: 38,
        isPublished: true,
        instructorIndex: 2
    },
    {
        title: 'Digital Marketing Complete Course',
        description: 'Learn all aspects of digital marketing including SEO, Google Ads, Facebook Ads, content marketing, email marketing, and analytics. Understand how to create marketing strategies that drive real business results. Includes practical campaigns and case studies from successful brands.',
        category: 'Marketing',
        level: 'Beginner',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        status: 'approved',
        enrolledCount: 134,
        rating: 4.4,
        reviewCount: 31,
        isPublished: true,
        instructorIndex: 2
    },
    {
        title: 'AWS Cloud Practitioner Certification Prep',
        description: 'Prepare for the AWS Cloud Practitioner certification exam. Understand cloud computing concepts, AWS services, pricing, security, and architecture. Includes practice exams and hands-on labs using the AWS Free Tier. Perfect for anyone starting their cloud computing journey.',
        category: 'Programming',
        level: 'Beginner',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        status: 'approved',
        enrolledCount: 98,
        rating: 4.5,
        reviewCount: 24,
        isPublished: true,
        instructorIndex: 0
    },
    {
        title: 'Business Analytics with Excel & SQL',
        description: 'Learn to analyze business data using Excel and SQL. Master pivot tables, VLOOKUP, advanced formulas, SQL queries, and data visualization. Apply these skills to real business scenarios including sales analysis, customer segmentation, and financial modeling.',
        category: 'Business',
        level: 'Beginner',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        status: 'approved',
        enrolledCount: 167,
        rating: 4.3,
        reviewCount: 42,
        isPublished: true,
        instructorIndex: 1
    },
    {
        title: 'Mobile App Development with React Native',
        description: 'Build cross-platform mobile apps for iOS and Android using React Native. Learn navigation, state management, API integration, push notifications, and app store deployment. Create 3 complete apps including a food delivery app, fitness tracker, and social network.',
        category: 'Programming',
        level: 'Intermediate',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
        status: 'approved',
        enrolledCount: 145,
        rating: 4.6,
        reviewCount: 35,
        isPublished: true,
        instructorIndex: 0
    },
    {
        title: 'JavaScript Algorithms & Data Structures',
        description: 'Master computer science fundamentals with JavaScript. Learn arrays, linked lists, trees, graphs, sorting algorithms, searching algorithms, and dynamic programming. Essential for technical interviews at top tech companies like Google, Amazon, and Microsoft.',
        category: 'Programming',
        level: 'Advanced',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
        status: 'pending',
        enrolledCount: 0,
        rating: 0,
        reviewCount: 0,
        isPublished: false,
        instructorIndex: 1
    }
];

const seedCourses = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Create instructors
        const createdInstructors = [];
        for (const instructorData of instructors) {
            let instructor = await User.findOne({ email: instructorData.email });
            if (!instructor) {
                instructor = await User.create(instructorData);
                console.log(`Created instructor: ${instructor.name}`);
            } else {
                console.log(`Instructor already exists: ${instructor.name}`);
            }
            createdInstructors.push(instructor);
        }

        // Create courses
        let coursesCreated = 0;
        let coursesSkipped = 0;

        for (const courseData of coursesData) {
            const { instructorIndex, ...course } = courseData;
            course.instructor = createdInstructors[instructorIndex]._id;

            // Check if course already exists
            const existingCourse = await Course.findOne({ title: course.title });
            if (existingCourse) {
                console.log(`Course already exists: ${course.title}`);
                coursesSkipped++;
                continue;
            }

            await Course.create(course);
            console.log(`Created course: ${course.title}`);
            coursesCreated++;
        }

        console.log('\n========================================');
        console.log('Course seeding completed!');
        console.log('========================================');
        console.log(`Courses created: ${coursesCreated}`);
        console.log(`Courses skipped: ${coursesSkipped}`);
        console.log('\nInstructor login credentials:');
        instructors.forEach(inst => {
            console.log(`  ${inst.name}: ${inst.email} / ${inst.password}`);
        });
        console.log('========================================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding courses:', error);
        process.exit(1);
    }
};

seedCourses();
