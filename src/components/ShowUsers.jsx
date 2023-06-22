import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import { useChat } from '../hooks/useChat';

const ShowUsers = ({ users, str, fn, blockFn }) => {
  const { user } = useAuth();
  const { blockUserById } = useApp();
  const { fetchChat } = useChat();
  const [blockedUser, setBlockedUser] = useState(null);
  const navigate = useNavigate();
  const blockUser = async () => {
    const data = await blockUserById(user.email, blockedUser.id);
    setBlockedUser(null);
    return data;
  };

  if (!users) return;

  return (
    <>
      {users.map((element, index) => {
        return (
          <div key={index} className="users-container">
            <span className={`${element.isOnline ? 'on-line' : 'off-line'} `}>
              .
            </span>

            {user.vip ? (
              <i
                className={`bi bi-dash-circle-fill`}
                id={element._id}
                onClick={() => {
                  setBlockedUser({ name: element.name, id: element._id });
                }}
              ></i>
            ) : (
              <i
                className={`bi bi-dash-circle-fill`}
                id={element._id}
                onClick={() => {
                  blockFn();
                }}
              ></i>
            )}

            <i
              className={`${str}`}
              id={element._id}
              onClick={async () => {
                const data = await fn(user.email, element._id);

                navigate(`/chat-room/${user._id}`);
                return data;
              }}
            ></i>

            <div className="min-height">
              <img
                src={element.image}
                alt={`${element.name} `}
                title={`${element.name} `}
              />
            </div>

            <div className="card-body">
              <ul className="ul">
                <li className=" name-li">
                  {element.name}, {element.age}
                </li>
              </ul>
            </div>
            <div>
              <Link
                className="link"
                to="/private"
                onClick={() => fetchChat(user, element)}
              >
                Send private message
              </Link>
            </div>
          </div>
        );
      })}
      {blockedUser && (
        <div className="block-alert-div">
          <div className="block-alert-message">
            {' '}
            Are you sure you want to block {blockedUser.name}?{' '}
          </div>
          <div className="block-alert-btns-div">
            <button
              className="block-alert-btn-return"
              onClick={() => setBlockedUser(null)}
            >
              {' '}
              Return
            </button>
            <button
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={blockUser}
              className=" block-alert-btn-block "
            >
              {' '}
              Block
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowUsers;
