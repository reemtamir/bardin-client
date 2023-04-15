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
  getBlocked,
  createVipReq,
  getVipReq,
  deleteVipReq,
  setTokenHeader,
  blockUser,
  unblockUser,
  getUsersWhoDidNotBlockedMe,
} from '../utils/axios';

export const context = createContext(null);
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [activeUser, setActiveUser] = useState(user);
  const [admin, setAdmin] = useState(getUser());
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState('');
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
      const favoriteUsersIdString = await getFavorites(user._id);
      for (let str of favoriteUsersIdString) {
        const { data: favorite } = await myProfile(str);

        setFavoriteUsers((users) => {
          if (users.some((user) => user._id === favorite._id)) {
            return users; // User already exists, return the existing array
          } else {
            return [...users, favorite]; // User doesn't exist, add the new user to the array
          }
        });
      }
    };
    getAllFavorites(user);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const getNonBlockUsers = async (id) => {
      try {
        const notBlockedUsers = await getUsersWhoDidNotBlockedMe(id);

        const notBlockedUserIds = []; // Array of not blocked users's ids

        // Push each not-blocked user id to notBlockedUserIds
        for (const user of notBlockedUsers) {
          notBlockedUserIds.push(user._id);
        }

        const favoriteUsersIds = []; // Array of favorite users' ids

        // Push each user id to favoriteUsersIds
        for (let fav of favoriteUsers) {
          favoriteUsersIds.push(fav._id.toString());
        }

        const manageUsersToRender = async () => {
          const usersToRender = [];

          for (const id of notBlockedUserIds) {
            if (!favoriteUsersIds.includes(id)) {
              // Get user from database with id
              const { data: user } = await myProfile(id);

              // Push that user to usersToRender
              usersToRender.push(user);
            }
          }

          // Set otherUsers's state with usersToRender
          // which contains all the user who are not blocked and not in favorites
          setOtherUsers(usersToRender);
        };

        manageUsersToRender();
      } catch (error) {
        return;
      }
    };
    getNonBlockUsers(user._id);
  }, [user, favoriteUsers]);

  useEffect(() => {
    if (!user) return;

    const getBlockedUsers = async (id) => {
      try {
        const data = await getBlocked(id);

        setBlockedUsers(data);
      } catch (error) {
        return;
      }
    };
    getBlockedUsers(user._id);
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
    setAdmin('');
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

  async function blockUserById(email, id) {
    const { data } = await blockUser(id, email);

    for (let user of favoriteUsers) {
      if (user._id === data._id) {
        await removeFromFavorites(id, email);
        setFavoriteUsers((favoriteUsers) => [
          ...favoriteUsers.filter((user) => user._id !== data._id),
        ]);
      }
    }
    for (let user of otherUsers) {
      if (user._id === data._id) {
        setOtherUsers((otherUsers) => [
          ...otherUsers.filter((user) => user._id !== data._id),
        ]);
      }
    }

    setUser((user) => ({
      ...user,
      blockList: [...user.blockList, data],
      favorites: user.favorites.filter((favUser) => favUser._id !== data._id),
    }));
    setBlockedUsers((blockedUsers) => [...blockedUsers, data]);
    return data;
  }
  async function addToFavoritesById(email, id) {
    const { data } = await addToFavorites(id, email);

    setFavoriteUsers((favoriteUsers) => [...favoriteUsers, data]);
    setOtherUsers((otherUsers) => [
      ...otherUsers.filter((user) => user._id !== id),
    ]);

    return id;
  }
  async function removeFromFavoritesById(email, id) {
    const { data } = await removeFromFavorites(id, email);

    setOtherUsers((otherUsers) => [...otherUsers, data]);
    setFavoriteUsers((favoriteUsers) => [
      ...favoriteUsers.filter(
        (user) => user._id.toString() !== data._id.toString()
      ),
    ]);

    return data;
  }
  async function unblockUserById(email, id) {
    const { data } = await unblockUser(id, email);

    setOtherUsers((otherUsers) => [...otherUsers, data]);
    setBlockedUsers((blockedUsers) => [
      ...blockedUsers.filter((user) => user._id !== data._id),
    ]);
    setUser((user) => ({
      ...user,
      blockList: user.blockList.filter(
        (blockedUser) => blockedUser._id !== data._id
      ),
    }));
    return data;
  }

  function logOut() {
    localStorage.removeItem('token');
    if (user) refreshUser();
    if (admin) refreshAdmin();
    setIsAdmin(false);
    setFavoriteUsers([]);
    setBlockedUsers([]);
    setActiveUser(null);
    setOtherUsers([]);

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
          otherUsers,

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
          blockUserById,
          unblockUserById,
          blockedUsers,
        }}
      >
        {children}
      </context.Provider>
    </>
  );
};

export default AuthContext;
