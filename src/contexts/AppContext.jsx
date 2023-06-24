import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  getUsers,
  myProfile,
  updateUser,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  getBlocked,
  createVipReq,
  getVipReq,
  deleteVipReq,
  blockUser,
  unblockUser,
  getUsersWhoDidNotBlockedMe,
  updateVip,
  updatePass,
} from '../utils/axiosApp';

export const context = createContext(null);

const AppContext = ({ children }) => {
  const { user, setActiveUser } = useAuth();
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [usersWhoDidNotBlockedMe, setUsersWhoDidNotBlockedMe] = useState([]);
  const [isInMainPage, setIsInMainPage] = useState(true);
  const [vipUsers, setVipUsers] = useState([]);
  const [vipReq, setVipReq] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [vipMessage, setVipMessage] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const getVips = async () => {
      const { data } = await getVipReq();
      setVipReq(data);
    };
    getVips();
  }, [vipUsers]);

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
        setUsersWhoDidNotBlockedMe(notBlockedUsers);
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

    return data;
  }

  const showAlert = () => {
    setVipMessage('Only for VIP members');
  };

  return (
    <>
      <context.Provider
        value={{
          getUsers,
          addToFavoritesById,
          removeFromFavoritesById,
          vipUsers,
          favoriteUsers,
          otherUsers,
          setOtherUsers,
          updateUser,
          updateVip,
          setFavoriteUsers,
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
          setBlockedUsers,
          imageUrl,
          setImageUrl,
          isDark,
          setIsDark,
          usersWhoDidNotBlockedMe,
          showAlert,
          vipMessage,
          setVipMessage,
          setVipUsers,
          getFavorites,
          setUsersWhoDidNotBlockedMe,
          updatePass,
        }}
      >
        {children}
      </context.Provider>
    </>
  );
};

export default AppContext;
