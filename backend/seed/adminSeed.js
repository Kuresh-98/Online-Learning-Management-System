/**
 * Admin Seed Script
 * Run this once to create an admin user
 * 
 * Usage: node seed/adminSeed.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');

// Admin credentials - CHANGE THESE!
const ADMIN_EMAIL = 'admin@learnhub.com';
const ADMIN_PASSWORD = 'Admin@123';
const ADMIN_NAME = 'Admin User';

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Email:', ADMIN_EMAIL);
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            role: 'admin'
        });

        console.log('----------------------------------------');
        console.log('Admin user created successfully!');
        console.log('----------------------------------------');
        console.log('Email:', ADMIN_EMAIL);
        console.log('Password:', ADMIN_PASSWORD);
        console.log('Role:', admin.role);
        console.log('----------------------------------------');
        console.log('Use these credentials to login at /login');
        console.log('----------------------------------------');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error.message);
        process.exit(1);
    }
};

createAdmin();
