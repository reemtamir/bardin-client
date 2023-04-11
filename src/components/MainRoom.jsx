import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ShowUsers from './ShowUsers';
import UserProfileDisplay from './UserProfileDisplay';

const MainRoom = () => {
  const {
    addToFavoritesById,
    removeFromFavoritesById,
    favoriteUsers,
    usersNotBlockToShow,
    notFavoriteUsers,
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
        <ShowUsers
          users={favoriteUsers}
          str={'bi bi-star-fill'}
          fn={removeFromFavoritesById}
        />

        {user.vip ? (
          <ShowUsers
            users={notFavoriteUsers}
            str={'bi bi-star'}
            fn={addToFavoritesById}
          />
        ) : (
          <div className="users">
            <ShowUsers
              users={notFavoriteUsers.filter((user, index) => index % 2 === 0)}
              str={'bi bi-star'}
              fn={showAlert}
            />

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
