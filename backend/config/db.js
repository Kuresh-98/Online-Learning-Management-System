const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas
 * This function establishes connection to our cloud database
 */
const connectDB = async () => {
    try {
        // Connect to MongoDB using connection string from .env
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // These options ensure a stable connection
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`
  
     ✅ MongoDB Connected Successfully!   
     🗄️  Database: ${conn.connection.name.padEnd(20)} 
     🌐 Host: ${conn.connection.host.padEnd(24)} 
  
    `);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // In development allow the server to continue so local features (like contact API)
        // can be tested without a live DB. Do not exit the process here.
        if (process.env.NODE_ENV === 'production') {
            process.exit(1); // Exit in production to avoid running without DB
        }
    }
};

module.exports = connectDB;