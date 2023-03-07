import React from 'react';
import { createContext, useState } from 'react';
import {
  getUser,
  signIn,
  signUp,
  getUsers,
  myProfile,
  updateUser,
  addToFavorites,
  getUsersById,
  removeFromFavorites,
} from '../utils/axios';
export const context = createContext(null);
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [favoriteUsers, setFavoriteUsers] = useState();
  const [notFavoriteUsers, setNotFavoriteUsers] = useState();

  const [error, setError] = useState('');
  function refreshUser() {
    setUser(getUser());
  }
  async function logIn(values) {
    const user = await signIn(values);
    refreshUser();
    return user;
  }
  async function addToFavoritesById(id, mail) {
    const { data } = await addToFavorites(id, mail);
    setUser((prevUser) => ({
      ...prevUser,
      favorites: [...prevUser.favorites, data],
    }));

    return data;
  }
  async function removeFromFavoritesById(id, mail) {
    const { data } = await removeFromFavorites(id, mail);

    setUser((prevUser) => ({
      ...prevUser,
      favorites: prevUser.favorites.filter((favoriteId) => favoriteId !== id),
    }));
    // setNotFavoriteUsers((notFavoriteUsers) => {
    //   notFavoriteUsers.filter((favoriteId) => favoriteId !== id);
    // });
    return data;
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
          error,
          setError,
          addToFavoritesById,
          getUsersById,
          removeFromFavoritesById,
          setUser,
          favoriteUsers,
          setFavoriteUsers,
          notFavoriteUsers,
          setNotFavoriteUsers,
        }}
      >
        {children}
      </context.Provider>
    </>
  );
};

export default AuthContext;
