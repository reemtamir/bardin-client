import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
const AdminPrivateRout = ({ children }) => {
  const { admin } = useAuth();

  if (!admin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminPrivateRout;
