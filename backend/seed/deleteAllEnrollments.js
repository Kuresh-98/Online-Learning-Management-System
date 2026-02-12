/**
 * Script to delete all enrollments from the database.
 * Use with caution: this will remove all user progress and enrollment records.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Enrollment = require('../models/enrollment');

const deleteAllEnrollments = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    const result = await Enrollment.deleteMany({});
    console.log(`Deleted ${result.deletedCount} enrollments.`);
    process.exit(0);
  } catch (err) {
    console.error('Error deleting enrollments:', err);
    process.exit(1);
  }
};

deleteAllEnrollments();
