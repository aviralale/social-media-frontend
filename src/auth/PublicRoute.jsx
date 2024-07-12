import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PublicRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;