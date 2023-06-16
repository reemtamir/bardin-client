import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import { Navigate } from 'react-router-dom';

const FavoritesPrivateRout = ({ children }) => {
  const { user } = useAuth();
  const { favoriteUsers } = useApp();

  if (!favoriteUsers.length) {
    return <Navigate to={`/chat-room/${user._id}`} />;
  }

  return children;
};

export default FavoritesPrivateRout;
