import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ShowUsers from './ShowUsers';
import ShowFavoriteUsersUsers from './ShowFavoriteUsersUsers';
import UserProfileDisplay from './UserProfileDisplay';

const MainRoom = () => {
  const {
    addToFavoritesById,
    removeFromFavoritesById,
    favoriteUsers,
    otherUsers,
    user,
  } = useAuth();
  const [message, setMessage] = useState('');
  const showAlert = () => {
    setMessage('Only for VIP members');
  };

  return (
    <>
      <div className="my-profile">
        <UserProfileDisplay />
      </div>

      <div className="users">
        {favoriteUsers.length ? (
          <>
            <ShowFavoriteUsersUsers
              str={'bi bi-star-fill'}
              fn={removeFromFavoritesById}
            />
          </>
        ) : null}
        {user.vip ? (
          <ShowUsers
            users={otherUsers}
            str={'bi bi-star'}
            fn={addToFavoritesById}
          />
        ) : (
          <div className="users">
            <ShowUsers users={otherUsers} str={'bi bi-star'} fn={showAlert} />

            {message && (
              <div className="vip-alert-div">
                <div className="vip-alert-message">{message}</div>
                <div className="vip-alert-btns-div">
                  <button
                    className="vip-alert-btn-return"
                    onClick={() => setMessage('')}
                  >
                    {' '}
                    Return
                  </button>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={'/vip-req-form'}
                    className=" vip-alert-btn-get-vip "
                  >
                    {' '}
                    Get vip
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MainRoom;
