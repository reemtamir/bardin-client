import React, { useState } from 'react';

import { useAuth } from '../hooks/useAuth';

const ShowBlockedUsers = () => {
  const { user, unblockUserById, blockedUsers } = useAuth();
  const [blockedUser, setBlockedUser] = useState(null);
  if (!blockedUsers.length) return;
  return (
    <>
      <div className="blocked-list">
        {blockedUsers.map((element, index) => (
          <div key={index} className="blocked-container">
            <div className="blocked-card-body">
              <ul className="ul">
                <li>{element.name}</li>
              </ul>
            </div>
            <img
              className="block-img"
              src={element.image}
              alt={`${element.name} `}
              title={`${element.name} `}
            />
            <p
              onClick={() => {
                setBlockedUser({ name: element.name, id: element._id });
              }}
              className={` blocked-p `}
              id={element._id}
            >
              Remove from block list
            </p>
          </div>
        ))}
      </div>
      {blockedUser && (
        <div className="block-alert-div">
          <div className="block-alert-message">
            {' '}
            Unblock {blockedUser.name}?{' '}
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
              onClick={async () => {
                const data = await unblockUserById(user.email, blockedUser.id);
                setBlockedUser(null);
                return data;
              }}
              className=" block-alert-btn-block "
            >
              {' '}
              Unblock
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowBlockedUsers;
