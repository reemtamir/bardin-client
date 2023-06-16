import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import { Navigate } from 'react-router-dom';

const BlockedPrivateRout = ({ children }) => {
  const { user } = useAuth();
  const { blockedUsers } = useApp();

  if (!blockedUsers.length) {
    return <Navigate to={`/chat-room/${user._id}`} />;
  }

  return children;
};

export default BlockedPrivateRout;
