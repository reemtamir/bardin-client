import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const FavoritesPrivateRout = ({ children }) => {
  const { favoriteUsers, user } = useAuth();

  if (!favoriteUsers.length) {
    return <Navigate to={`/chat-room/${user._id}`} />;
  }

  return children;
};

export default FavoritesPrivateRout;
