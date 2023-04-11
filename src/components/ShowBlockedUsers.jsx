import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ShowBlockedUsers = () => {
  const { user, unblockUserById, blockedUsers } = useAuth();
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
            />
            <p
              className={` blocked-p `}
              id={element._id}
              onClick={async () => {
                const data = await unblockUserById(user.email, element._id);

                return data;
              }}
            >
              Remove from block list
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowBlockedUsers;
