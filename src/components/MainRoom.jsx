import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import { useChat } from '../hooks/useChat';
import ShowUsers from './ShowUsers';
import ShowFavoriteUsersUsers from './ShowFavoriteUsersUsers';
import UserProfileDisplay from './UserProfileDisplay';

const MainRoom = () => {
  const { user, setIsAdmin, socket } = useAuth();

  const {
    addToFavoritesById,
    removeFromFavoritesById,
    favoriteUsers,
    otherUsers,
    showAlert,
    vipMessage,
    setVipMessage,
    setOtherUsers,
  } = useApp();
  const { setChat, setUsersInChat, setAlert } = useChat();

  useEffect(() => {
    setVipMessage('');
    setIsAdmin(false);
    setChat(null);
    setUsersInChat([]);
  }, []);

  socket.on('onLine', (data) => {
    setOtherUsers([
      ...otherUsers.map((u) => {
        if (u.email === data.email) {
          return { ...u, isOnline: true };
        } else return u;
      }),
    ]);
  });
  socket.on('offLine', (data) => {
    setOtherUsers([
      ...otherUsers.map((u) => {
        if (u.email === data.email) {
          return { ...u, isOnline: false };
        } else return u;
      }),
    ]);
  });

  socket.on('messageResponse', (data) => {
    setAlert(`New message from ${data.sender.name.toUpperCase()} `);
    setTimeout(() => {
      setAlert('');
    }, 6000);

    return;
  });
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
