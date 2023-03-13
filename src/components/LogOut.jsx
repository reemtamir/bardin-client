import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
  const { logOut, setIsAdmin, setFavoriteUsers } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logOut();
    setIsAdmin(false);
    setFavoriteUsers([]);
    navigate('/');
  }, []);
  return null;
};

export default LogOut;
