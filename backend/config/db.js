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
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;