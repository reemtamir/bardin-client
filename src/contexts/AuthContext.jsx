import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

import { myProfile, updateOnlineStatus } from '../utils/axiosApp';
import { socket } from '../utils/axiosChat';

import {
  getUser,
  signIn,
  signUp,
  signUpAdmin,
  signInAdmin,
  setTokenHeader,
} from '../utils/axiosAuth';

export const context = createContext(null);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [activeUser, setActiveUser] = useState(user);
  const [admin, setAdmin] = useState(getUser());
  const [isAdmin, setIsAdmin] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    setIsAdmin(admin);
  }, [admin]);

  useEffect(() => {
    if (!user) return;

    const getActiveProfile = async (id) => {
      const { data } = await myProfile(id);
      setActiveUser(data);
    };

    getActiveProfile(user._id);
  }, [user]);

  function refreshUser() {
    setUser(getUser());
  }

  function refreshAdmin() {
    setAdmin(getUser());
  }

  async function logIn(values) {
    try {
      const { data } = await signIn(values);

      localStorage.setItem('token', data);

      setTokenHeader();
      socket.connect();
      socket.emit('connection', getUser().email);
      toast(`welcome ${getUser().name}!`);

      return setUser(getUser());
    } catch ({ response }) {
      setAuthError(response.data);
    }
  }

  async function logInAdmin(values) {
    try {
      const { data } = await signInAdmin(values);

      localStorage.setItem('token', data);

      setAdmin(getUser());
      setTokenHeader();

      toast(`welcome ${getUser().name}!`);
    } catch ({ response }) {
      setAuthError(response.data);
    }
  }

  async function logOut() {
    localStorage.removeItem('token');

    if (user) {
      await updateOnlineStatus(user.email);

      socket.emit('offLine', user.email);
      return refreshUser();
    } else if (admin) {
      await updateOnlineStatus(admin.email);
      return refreshAdmin();
    }

    socket.disconnect();
  }

  return (
    <>
      <context.Provider
        value={{
          logIn,
          logOut,
          signUp,
          user,
          activeUser,
          authError,
          setAuthError,
          setUser,
          signUpAdmin,
          logInAdmin,
          admin,
          isAdmin,
          setIsAdmin,
          setActiveUser,
          socket,
        }}
      >
        {children}
      </context.Provider>
    </>
  );
};

export default AuthContext;
