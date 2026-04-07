import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  let currentUser = null;
  if (userStr) {
    try {
      currentUser = JSON.parse(userStr);
    } catch (e) {
      console.error('Failed to parse user from localStorage');
    }
  }

  // If there's no token or no user, redirect to login
  if (!token || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and user lacks it, optionally redirect to root
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h2>
        <p className="text-gray-600 mb-6">Your current role ({currentUser.role}) does not have permission to view this page.</p>
        <a href="/" className="px-4 py-2 bg-orange-600 text-white rounded-md">Return Home</a>
      </div>
    );
  }

  // If authenticated and authorized, render the child routes (via Layout)
  return <Outlet />;
};

export default ProtectedRoutes;
