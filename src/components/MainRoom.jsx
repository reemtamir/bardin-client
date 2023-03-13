import React from 'react';

import { useAuth } from '../hooks/useAuth';
import ShowUsers from './ShowUsers';
import UserProfileDisplay from './UserProfileDisplay';
const MainRoom = () => {
  const {
    addToFavoritesById,
    removeFromFavoritesById,
    favoriteUsers,
    notFavoriteUsers,
  } = useAuth();

  return (
    <>
      <div className="my-profile">
        <UserProfileDisplay />
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
