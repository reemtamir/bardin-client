import React, { useState, useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import ShowUsers from './ShowUsers';
import UserProfileDisplay from './UserProfileDisplay';
const MainRoom = () => {
  const {
    getUsers,
    user,
    addToFavoritesById,
    removeFromFavoritesById,
    getUsersById,
    favoriteUsers,
    setFavoriteUsers,
    users, setUsers,
  } = useAuth();

  // const [users, setUsers] = useState();

  const [notFavoriteUsers, setNotFavoriteUsers] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    getAllUsers();
  }, [user]);

  useEffect(() => {
    const getFavoriteUsersById = async () => {
      try {
        const data = await getUsersById(favoriteUsersId);

        setFavoriteUsers(data);
      } catch (error) {
        return null;
      }
    };
    getFavoriteUsersById();
  }, [users, user]);
  useEffect(() => {
    const getNotFavoriteUsersById = async () => {
      try {
        const data = await getUsersById(nonFavoriteUsersId);

        setNotFavoriteUsers(data);
      } catch (error) {
        return null;
      }
    };
    getNotFavoriteUsersById();
  }, [users, user]);

  if (!users) return null;

  const filteredUsers = users.filter((e) => e.email !== user.email);
  let userFavorites = user.favorites;
  const favoriteUserSet = new Set(userFavorites);
  let allUsers = filteredUsers.map((user) => user._id);
 const nonFavoriteUsersId = allUsers.filter((u) => !favoriteUserSet.has(u));
 const favoriteUsersId = allUsers.filter((u) => favoriteUserSet.has(u));
  const filteredUser = users.filter((e) => e.email === user.email);

  const activeUser = filteredUser[0];

  return (
    <>
      <div className="my-profile">
        <UserProfileDisplay activeUser={activeUser} />
      </div>

      <div className="users">
        <ShowUsers
          users={favoriteUsers}
          str={'bi bi-star-fill'}
          fn={removeFromFavoritesById}
        />
        <ShowUsers
          users={notFavoriteUsers}
          str={'bi bi-star'}
          fn={addToFavoritesById}
        />
      </div>
    </>
  );
};

export default MainRoom;
