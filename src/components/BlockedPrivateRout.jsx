import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const BlockedPrivateRout = ({ children }) => {
  const { blockedUsers, user } = useAuth();

  if (!blockedUsers.length) {
    return <Navigate to={`/chat-room/${user._id}`} />;
  }

  return children;
};

export default BlockedPrivateRout;
