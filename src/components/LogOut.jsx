import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logOut();

    navigate('/');
  }, []);
  return null;
};

export default LogOut;
