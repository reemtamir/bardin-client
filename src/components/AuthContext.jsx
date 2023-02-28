import { warning } from '@remix-run/router';
import React from 'react';
import { createContext, useState } from 'react';
import {
  getUser,
  signIn,
  signUp,
  getUsers,
  myProfile,
  updateUser,
  UseUser,
} from '../utils/axios';
export const context = createContext(null);
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(getUser());

  function refreshUser() {
    setUser(getUser());
  }
  async function logIn(values) {
    const user = await signIn(values);
    setUser('user', user);
    refreshUser();
    return user;
  }
  function logOut() {
    localStorage.removeItem('token');
    refreshUser();
  }

  return (
    <>
      <context.Provider
        value={{
          logIn,
          logOut,
          signUp,
          getUser,
          user,
          getUsers,
          myProfile,
          updateUser,
          UseUser,
        }}
      >
        {children}
      </context.Provider>
    </>
  );
};

export default AuthContext;
