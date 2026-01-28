// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');





// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();


// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (allows React to communicate)

// Simple test route
app.get('/', (req, res) => {
    res.json({
        message: '🚀 LMS API is running!',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            courses: '/api/courses',
            enrollments: '/api/enrollments'
        }
    });
});

// Health check route (useful for deployment)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});


// Import Routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');


// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
// Get PORT from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`
  
     🎓 LMS Server is Running!                                   
     📡 Port: ${PORT}                                            
     🌍 Environment: ${process.env.NODE_ENV || 'development'}    
     🔗 URL: http://localhost:${PORT}                            
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('❌ UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
