import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
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
  updateVip,
  getFavorites,
  getNotFavorites,
  createVipReq,
  getVipReq,
  deleteVipReq,
  setTokenHeader,
} from '../utils/axios';

export const context = createContext(null);
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [activeUser, setActiveUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState();
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [notFavoriteUsers, setNotFavoriteUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(admin);
  const [isInMainPage, setIsInMainPage] = useState(true);
  const [error, setError] = useState('');
  const [vipUsers, setVipUsers] = useState([]);
  const [vipReq, setVipReq] = useState([]);

  useEffect(() => {
    const getVips = async () => {
      const { data } = await getVipReq();
      setVipReq(data);
    };
    getVips();
  }, [vipUsers]);
  useEffect(() => {
    setIsAdmin(admin);
  }, [admin]);
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
      try {
        const data = await getNotFavorites(id);

        setNotFavoriteUsers(data);
      } catch (error) {
        return;
      }
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
  useEffect(() => {
    refreshUser();
  }, []);

  async function logIn(values, user) {
    try {
      const { data } = await signIn(values);
      if (!data) return;
      localStorage.setItem('token', data);
      setTokenHeader();
      setUser(getUser());

      toast(`welcome ${getUser().name}!`);
      return user;
    } catch ({ response }) {
      setError(response.data);
    }
  }

  async function logInAdmin(values) {
    try {
      const { data } = await signInAdmin(values);
      localStorage.setItem('token', data);
      refreshAdmin();
      setTokenHeader();
      toast(`welcome ${getUser().name}!`);
      return admin;
    } catch ({ response }) {
      setError(response.data);
    }

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
    setIsAdmin(false);
    setFavoriteUsers([]);
    setActiveUser(null);
    setError('');
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
          updateVip,
          vipUsers,
          setVipUsers,
          isInMainPage,
          setIsInMainPage,
          createVipReq,
          vipReq,
          deleteVipReq,
          setVipReq,
          setActiveUser,
        }}
      >
        {children}
      </context.Provider>
    </>
  );
};

export default AuthContext;
