import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import {
  getUser,
  signIn,
  signUp,
  getUsers,
  myProfile,
  updateUser,
  addToFavorites,
  removeFromFavorites,
  signUpAdmin,
  signInAdmin,
  getFavorites,
  getNotFavorites,
} from '../utils/axios';
export const context = createContext(null);
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [activeUser, setActiveUser] = useState(null);
  const [admin, setAdmin] = useState(getUser());
  const [users, setUsers] = useState();
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [notFavoriteUsers, setNotFavoriteUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const getAllFavorites = async (user) => {
      const data = await getFavorites(user._id);
      setFavoriteUsers(data);
    };
    getAllFavorites(user);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const getAllNotFavorites = async (id) => {
      const data = await getNotFavorites(id);
      setNotFavoriteUsers(data);
    };
    getAllNotFavorites(user._id);
  }, [user]);
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
    const user = await signIn(values);
    refreshUser();

    return user;
  }
  async function logInAdmin(values) {
    const { data } = await signInAdmin(values);
    console.log(data);
    refreshAdmin();

    return admin;
  }
  async function addToFavoritesById(email, id) {
    const { data } = await addToFavorites(id, email);

    setFavoriteUsers((favoriteUsers) => [...favoriteUsers, data]);
    setNotFavoriteUsers((notFavoriteUsers) => [
      ...notFavoriteUsers.filter((user) => user._id !== data._id),
    ]);
    return data;
  }
  async function removeFromFavoritesById(email, id) {
    const { data } = await removeFromFavorites(id, email);

    setNotFavoriteUsers((notFavoriteUsers) => [...notFavoriteUsers, data]);
    setFavoriteUsers((favoriteUsers) => [
      ...favoriteUsers.filter((user) => user._id !== data._id),
    ]);

    return data;
  }
  function logOut() {
    localStorage.removeItem('token');
    if (user) refreshUser();
    if (admin) refreshAdmin();
  }

  return (
    <>
      <context.Provider
        value={{
          logIn,
          logOut,
          signUp,
          user,
          getUsers,
          activeUser,
          updateUser,
          error,
          setError,
          addToFavoritesById,
          removeFromFavoritesById,
          setUser,
          favoriteUsers,
          notFavoriteUsers,
          users,
          setUsers,
          signUpAdmin,
          logInAdmin,
          admin,
          isAdmin,
          setIsAdmin,
          setFavoriteUsers,

          // getFavorites,
          // getNotFavorites,
        }}
      >
        {children}
      </context.Provider>
    </>
  );
};

export default AuthContext;
