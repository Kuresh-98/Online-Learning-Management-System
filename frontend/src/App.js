import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/common/ProtectedRoute';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Learn from './pages/Learn';
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import MyLearning from './pages/dashboard/MyLearning';
import CreateCourse from './pages/dashboard/CreateCourse';
import MyCourses from './pages/dashboard/MyCourses';

// Admin Pages
import AdminUsers from './pages/dashboard/AdminUsers';
import AdminCourses from './pages/dashboard/AdminCourses';
import AdminApprovals from './pages/dashboard/AdminApprovals';

// Shared Pages
import Analytics from './pages/dashboard/Analytics';
import InstructorStudents from './pages/dashboard/InstructorStudents';
import StudentReviews from './pages/dashboard/StudentReviews';
import ChangePassword from './pages/dashboard/ChangePassword';

// Import CSS
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              style: {
                background: '#10B981',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#EF4444',
              },
            },
          }}
        />

        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/courses" element={<><Navbar /><Courses /><Footer /></>} />
          <Route path="/course/:id" element={<><Navbar /><CourseDetail /><Footer /></>} />
          <Route path="/course/:id/learn" element={<><Navbar /><Learn /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />

          {/* Auth Routes (No Navbar) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            {/* Student Routes */}
            <Route path="my-learning" element={<MyLearning />} />
            <Route path="reviews" element={<StudentReviews />} />

            {/* Instructor Routes */}
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="students" element={<InstructorStudents />} />

            {/* Admin Routes */}
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="approvals" element={<AdminApprovals />} />

            {/* Shared Routes */}
            <Route path="analytics" element={<Analytics />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300">404</h1>
                <p className="text-xl text-gray-600 mt-4">Page not found</p>
                <a href="/" className="inline-block mt-6 btn-primary">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
