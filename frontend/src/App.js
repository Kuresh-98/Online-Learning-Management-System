import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/common/ProtectedRoute';

// Layout Components
import Navbar from './components/layout/Navbar';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';

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
          {/* Public Routes with Navbar */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/courses" element={<><Navbar /><Courses /></>} />
          <Route path="/course/:id" element={<><Navbar /><CourseDetail /></>} />

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
            {/* Add more dashboard sub-routes here */}
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
