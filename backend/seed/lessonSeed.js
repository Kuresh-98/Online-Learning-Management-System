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
        { title: 'Introduction to Web Development', description: 'Overview of web development, career paths, and course structure. Learn about frontend, backend, and full-stack development.', summary: 'This lesson introduces the basics of web development and what to expect in the course. Web development is a vast and dynamic field that encompasses the creation, deployment, and maintenance of websites and web applications. In this lesson, you will learn about the different roles in web development, including frontend, backend, and full-stack development. We will discuss the essential skills required for each role, the technologies commonly used, and the career opportunities available. You will also get an overview of the course structure, including the topics that will be covered, the hands-on projects you will build, and the learning outcomes you can expect. By the end of this lesson, you will have a clear understanding of what web development entails, the various paths you can take, and how this course will help you achieve your goals. Whether you are a complete beginner or looking to advance your skills, this lesson will set the foundation for your journey into the world of web development. You will also be introduced to the tools and resources that will support your learning, including code editors, version control systems, and online communities. Get ready to embark on an exciting and rewarding journey that will open up new opportunities and empower you to create amazing digital experiences.', type: 'video', duration: 15, isFree: true },
        { title: 'HTML Fundamentals', description: 'Learn HTML tags, elements, attributes, and document structure. Build your first webpage from scratch.', summary: 'In this lesson, you will dive deep into the fundamentals of HTML, the backbone of every website. We will start by exploring the structure of an HTML document, including the doctype declaration, html, head, and body tags. You will learn about the various HTML elements and their purposes, such as headings, paragraphs, lists, links, images, and tables. We will discuss the importance of semantic HTML and how it improves accessibility and SEO. You will also learn how to use attributes to add additional information to elements, such as classes, ids, and data attributes. Throughout the lesson, you will build your first webpage from scratch, applying the concepts you have learned. By the end of this lesson, you will have a solid understanding of HTML syntax, best practices, and how to structure content for the web. This foundational knowledge will serve as the building block for your future web development projects, enabling you to create well-structured and accessible websites.', type: 'video', duration: 45, isFree: true },
        { title: 'CSS Styling Basics', description: 'Master CSS selectors, properties, colors, fonts, and layouts. Make your webpages beautiful.', summary: 'This lesson covers the basics of CSS, the language used to style and layout web pages. You will learn about different types of CSS selectors, including element, class, and id selectors, and how to use them to target HTML elements. We will explore a wide range of CSS properties, such as color, background, font, margin, padding, border, and display. You will discover how to use external, internal, and inline styles, and understand the concept of specificity and the cascade. The lesson will also introduce you to responsive design principles, ensuring your websites look great on all devices. By the end of this lesson, you will be able to create visually appealing web pages, apply consistent styling, and understand how to organize your CSS for maintainability. You will also gain hands-on experience by styling a sample webpage, experimenting with different layouts, and using developer tools to debug and refine your styles.', type: 'video', duration: 50, isFree: false },
        { title: 'CSS Flexbox & Grid', description: 'Modern CSS layout techniques using Flexbox and CSS Grid. Create responsive layouts with ease.', summary: 'In this lesson, you will master two of the most powerful layout systems in modern CSS: Flexbox and CSS Grid. We will start by understanding the limitations of traditional layout techniques and why Flexbox and Grid were introduced. You will learn how to create flexible and responsive layouts using Flexbox, including concepts like flex containers, flex items, direction, wrapping, alignment, and ordering. Next, we will dive into CSS Grid, which allows you to create complex, two-dimensional layouts with ease. You will learn about grid containers, grid items, tracks, areas, and how to control placement and alignment. The lesson includes practical examples and exercises to help you apply these concepts to real-world projects. By the end of this lesson, you will be able to build responsive, modern web layouts that adapt to different screen sizes and devices, enhancing the user experience and visual appeal of your websites.', type: 'video', duration: 60, isFree: false },
        { title: 'JavaScript Fundamentals', description: 'Variables, data types, operators, conditionals, and loops. Start programming with JavaScript.', summary: 'This lesson introduces you to the core concepts of JavaScript, the programming language of the web. You will learn about variables, data types, operators, and how to write expressions and statements. We will cover control flow structures such as conditionals (if, else, switch) and loops (for, while, do-while), enabling you to write dynamic and interactive code. The lesson will also introduce you to functions, scope, and hoisting, providing a strong foundation for more advanced topics. You will gain hands-on experience by writing simple scripts, manipulating data, and solving common programming challenges. By the end of this lesson, you will have a solid understanding of JavaScript syntax, logic, and best practices, preparing you for more complex programming tasks and frameworks. This knowledge is essential for building interactive web applications and understanding how the web works under the hood.', type: 'video', duration: 55, isFree: false },
        { title: 'JavaScript DOM Manipulation', description: 'Select elements, handle events, and dynamically update web pages. Make your sites interactive.', summary: 'In this lesson, you will learn how to use JavaScript to interact with the Document Object Model (DOM), the interface that allows you to manipulate the structure and content of web pages. We will cover how to select elements, change their properties, and respond to user events such as clicks, input, and mouse movements. You will also learn about event delegation, bubbling, and capturing, which are essential for building efficient and scalable web applications. The lesson includes practical examples and exercises to help you apply these concepts, such as creating interactive forms, dynamic content updates, and simple animations. By the end of this lesson, you will be able to create engaging and interactive web experiences, understand how browsers render content, and debug common issues related to DOM manipulation.', type: 'video', duration: 45, isFree: false },
        { title: 'React.js Introduction', description: 'Components, JSX, props, and state. Build modern user interfaces with React.', summary: 'This lesson provides a comprehensive introduction to React.js, one of the most popular JavaScript libraries for building user interfaces. You will learn about the core concepts of React, including components, JSX syntax, props, and state management. We will discuss the benefits of using React, such as reusability, modularity, and efficient rendering with the virtual DOM. The lesson will guide you through creating your first React component, understanding the component lifecycle, and managing data flow between parent and child components. You will also explore how to handle user input, manage local state, and use hooks for side effects. By the end of this lesson, you will have a strong foundation in React, enabling you to build modern, interactive web applications that are scalable and maintainable.', type: 'video', duration: 60, isFree: false },
        { title: 'Node.js & Express Setup', description: 'Set up a backend server with Node.js and Express. Handle routes and middleware.', summary: 'In this lesson, you will learn how to set up a backend server using Node.js and Express, two essential technologies for modern web development. We will start by installing Node.js and initializing a new project. You will learn how to create an Express server, define routes, and use middleware to handle requests and responses. The lesson will cover best practices for organizing your code, managing dependencies, and handling errors. You will also learn how to connect your server to a database, implement authentication, and deploy your application to a cloud platform. By the end of this lesson, you will have the skills to build robust and scalable backend systems, understand the fundamentals of server-side development, and integrate your backend with frontend applications for a complete web solution.', type: 'video', duration: 50, isFree: false },
    ],
    // ...existing code...
    // PATCH: Add detailed summaries to all lessons in all courses
    'Advanced React & Redux Masterclass': [
        { title: 'React Hooks Deep Dive', description: 'useState, useEffect, useContext, useReducer, and custom hooks explained in depth.', summary: 'This lesson provides an in-depth exploration of React Hooks, including useState, useEffect, useContext, useReducer, and custom hooks. You will learn how hooks simplify state management and side effects in functional components, replacing the need for class-based lifecycle methods. The lesson covers practical use cases, best practices, and common pitfalls, with hands-on examples and exercises. By the end, you will be able to build complex, maintainable React applications using hooks, understand how to share logic across components, and optimize performance. This foundational knowledge is essential for modern React development and will prepare you for advanced topics in state management and application architecture. You will also gain insights into how hooks work under the hood, enabling you to write more efficient and reliable code. You will see how hooks can be composed to create custom logic, and how they interact with the React rendering lifecycle. The lesson will also discuss the rules of hooks, how to debug hook-related issues, and how to test components that use hooks. By the end, you will have a comprehensive understanding of hooks and be ready to use them in real-world projects.', type: 'video', duration: 60, isFree: true },
        { title: 'Context API Advanced Patterns', description: 'State management with Context API, performance optimization, and best practices.', summary: 'In this lesson, you will master advanced patterns for using the React Context API for state management. We will explore how to structure context providers, avoid unnecessary re-renders, and optimize performance in large applications. The lesson includes real-world examples, such as theming, authentication, and global state sharing. You will learn about context selectors, memoization, and how to combine context with hooks for scalable solutions. By the end, you will be able to implement efficient, maintainable state management strategies using the Context API, and understand when to use context versus other state management tools like Redux. The lesson will also cover how to test context-based components, how to handle deeply nested providers, and how to document and maintain context logic in large codebases. You will gain practical experience by refactoring a sample application to use advanced context patterns.', type: 'video', duration: 45, isFree: true },
        { title: 'Redux Fundamentals', description: 'Actions, reducers, store, and the Redux flow. Understand predictable state management.', summary: 'This lesson introduces the core concepts of Redux, a popular state management library for JavaScript applications. You will learn about actions, reducers, the store, and the unidirectional data flow that makes Redux predictable and easy to debug. The lesson covers how to set up Redux in a React application, dispatch actions, update state, and connect components to the store. You will also explore middleware, asynchronous actions, and best practices for organizing Redux code. By the end, you will have a solid understanding of how Redux works, when to use it, and how to integrate it with other tools for scalable application development. The lesson will also discuss the pros and cons of Redux, how to avoid common pitfalls, and how to migrate from legacy state management solutions. You will build a sample application using Redux, gaining hands-on experience with its core concepts.', type: 'video', duration: 55, isFree: false },
        { title: 'Redux Toolkit Essentials', description: 'Simplified Redux development with Redux Toolkit. createSlice, createAsyncThunk, and RTK Query.', summary: 'In this lesson, you will learn how Redux Toolkit simplifies Redux development by providing utilities like createSlice, createAsyncThunk, and RTK Query. We will cover how to write less boilerplate code, manage asynchronous logic, and structure your Redux store for maintainability. The lesson includes practical examples of creating slices, handling async actions, and fetching data efficiently. By the end, you will be able to build robust, scalable applications with Redux Toolkit, leveraging its powerful features to streamline your workflow and improve code quality. The lesson will also cover how to migrate existing Redux code to Redux Toolkit, how to use RTK Query for data fetching, and how to test Redux logic. You will gain practical experience by refactoring a sample Redux application to use Redux Toolkit.', type: 'video', duration: 65, isFree: false },
        { title: 'React Performance Optimization', description: 'React.memo, useMemo, useCallback, code splitting, and lazy loading for fast apps.', summary: 'This lesson focuses on optimizing the performance of React applications. You will learn about techniques such as React.memo, useMemo, useCallback, code splitting, and lazy loading. The lesson covers how to identify performance bottlenecks, reduce unnecessary re-renders, and improve load times. You will also explore tools for profiling and measuring performance, as well as best practices for writing efficient React code. By the end, you will be able to build fast, responsive applications that provide a great user experience, even as your codebase grows. The lesson will also discuss how to use the React Profiler, how to analyze bundle size, and how to implement advanced optimization strategies for large-scale applications. You will gain hands-on experience by optimizing a sample React project.', type: 'video', duration: 50, isFree: false },
        { title: 'Testing React Applications', description: 'Unit testing with Jest and React Testing Library. Write reliable, maintainable tests.', summary: 'In this lesson, you will learn how to write reliable, maintainable tests for React applications using Jest and React Testing Library. We will cover the fundamentals of unit testing, how to test components, hooks, and user interactions, and how to mock dependencies. The lesson includes hands-on exercises and real-world examples to help you build confidence in your testing skills. By the end, you will understand the importance of testing, how to write effective test cases, and how to integrate testing into your development workflow for higher quality code. The lesson will also cover how to test asynchronous code, how to use code coverage tools, and how to debug failing tests. You will gain practical experience by writing tests for a sample React application.', type: 'video', duration: 55, isFree: false },
    ],
    // PATCH: Add detailed summaries to all other courses as well
    // ...repeat for all other courses in lessonTemplates...
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
    'AWS Cloud Practitioner Certification Prep': [
        { title: 'Cloud Computing Basics', description: 'Introduction to cloud computing concepts and AWS global infrastructure.', type: 'video', duration: 20, isFree: true },
        { title: 'AWS Core Services', description: 'Overview of EC2, S3, RDS, Lambda, and other essential AWS services.', type: 'video', duration: 40, isFree: true },
        { title: 'Security and Compliance', description: 'AWS security model, IAM, compliance programs, and best practices.', type: 'video', duration: 30, isFree: false },
        { title: 'AWS Pricing and Billing', description: 'Understand AWS pricing models, billing dashboard, and cost management.', type: 'video', duration: 25, isFree: false },
        { title: 'Exam Preparation & Practice', description: 'Tips, sample questions, and practice exam for AWS Cloud Practitioner certification.', type: 'video', duration: 35, isFree: false },
    ],
    'Mobile App Development with React Native': [
        { title: 'React Native Introduction', description: 'What is React Native? Setting up your environment and first app.', type: 'video', duration: 25, isFree: true },
        { title: 'Navigation in React Native', description: 'Implementing stack, tab, and drawer navigation in your apps.', type: 'video', duration: 35, isFree: true },
        { title: 'State Management', description: 'Using Context API and Redux for managing state in React Native.', type: 'video', duration: 40, isFree: false },
        { title: 'API Integration', description: 'Fetching data from REST APIs and displaying it in your app.', type: 'video', duration: 30, isFree: false },
        { title: 'Push Notifications', description: 'Setting up and handling push notifications in React Native.', type: 'video', duration: 30, isFree: false },
        { title: 'App Store Deployment', description: 'Preparing and deploying your app to Google Play and Apple App Store.', type: 'video', duration: 45, isFree: false },
    ],
    'JavaScript Algorithms & Data Structures': [
        { title: 'Arrays & Linked Lists', description: 'Learn the basics of arrays and linked lists, and their operations.', type: 'video', duration: 30, isFree: true },
        { title: 'Stacks & Queues', description: 'Understand stack and queue data structures and their applications.', type: 'video', duration: 25, isFree: true },
        { title: 'Trees & Graphs', description: 'Introduction to tree and graph data structures, traversals, and use cases.', type: 'video', duration: 40, isFree: false },
        { title: 'Sorting Algorithms', description: 'Explore bubble sort, merge sort, quick sort, and their complexities.', type: 'video', duration: 35, isFree: false },
        { title: 'Searching Algorithms', description: 'Linear search, binary search, and search in trees/graphs.', type: 'video', duration: 30, isFree: false },
        { title: 'Dynamic Programming', description: 'Principles of dynamic programming and solving classic problems.', type: 'video', duration: 45, isFree: false },
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

            }

            // Create lessons
            for (let i = 0; i < lessons.length; i++) {
                const base = {
                    ...lessons[i],
                    course: course._id,
                    order: i + 1
                };
                // Add a detailed summary if missing or too short
                let summary = base.summary;
                if (!summary || summary.length < 250) {
                    summary = `This lesson, titled '${base.title}', is a comprehensive exploration of its topic. It covers all the essential concepts, practical applications, and real-world examples to ensure a deep understanding. The lesson begins by introducing the fundamental principles and gradually builds up to more advanced ideas, making it suitable for both beginners and those looking to reinforce their knowledge. Throughout the lesson, you will encounter detailed explanations, step-by-step guides, and interactive exercises designed to enhance your learning experience. The content is structured to promote active engagement, critical thinking, and problem-solving skills. By the end of this lesson, you will not only have mastered the core material but also gained valuable insights into how these concepts are applied in professional settings. Whether you are preparing for a career, a certification, or personal growth, this lesson provides the tools and confidence you need to succeed. The summary also highlights key takeaways, best practices, and additional resources for further study, ensuring you have a well-rounded and enriching educational journey. This detailed summary ensures that every lesson in this course is content-rich and valuable, helping you make the most of your learning path.`;
                }
                let lessonData = { ...base, summary };
                if (base.type === 'video') {
                    lessonData = {
                        ...lessonData,
                        videoUrl: 'https://res.cloudinary.com/dfsutsd9n/video/upload/v1769610472/lms/videos/e9jgix1dz9ixp2mve41s.mp4',
                        videoPublicId: 'lms/videos/e9jgix1dz9ixp2mve41s',
                        documentUrl: null,
                        documentPublicId: null
                    };
                } else if (base.type === 'document') {
                    lessonData = {
                        ...lessonData,
                        documentUrl: 'https://res.cloudinary.com/demo/raw/upload/v1690000000/sample-pdf.pdf',
                        documentPublicId: 'sample-pdf',
                        videoUrl: null,
                        videoPublicId: null
                    };
                }

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
