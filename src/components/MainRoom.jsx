import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ShowUsers from './ShowUsers';
import ShowFavoriteUsersUsers from './ShowFavoriteUsersUsers';
import UserProfileDisplay from './UserProfileDisplay';
import NavBar from './NavBar';

const MainRoom = () => {
  const {
    addToFavoritesById,
    removeFromFavoritesById,
    favoriteUsers,
    otherUsers,
    user,
    showAlert,
    vipMessage,
    setVipMessage,
  } = useAuth();
  useEffect(() => {
    setVipMessage('');
  }, []);
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
              blockFn={showAlert}
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
            <ShowUsers
              users={otherUsers.filter((user, index) => index % 3 !== 1)}
              str={'bi bi-star'}
              blockFn={showAlert}
              fn={showAlert}
            />

            {vipMessage && (
              <div className="vip-alert-div">
                <div className="vip-alert-message">{vipMessage}</div>
                <div className="vip-alert-btns-div">
                  <button
                    className="vip-alert-btn-return"
                    onClick={() => setVipMessage('')}
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
