import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const FavoritesPrivateRout = ({ children }) => {
  const { favoriteUsers } = useAuth();

  if (!favoriteUsers.length) {
    return <Navigate to="/" />;
  }

  return children;
};

export default FavoritesPrivateRout;
