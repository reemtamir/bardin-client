import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
const UserProfileDisplay = () => {
  const { user, activeUser } = useAuth();

  if (!user) return;

  return (
    <>
      <div className="user-container ">
        <div className="min-height">
          <img src={activeUser.image} alt={`${activeUser.name} `} />
        </div>

        <div className="my-card-body">
          <ul className="my-ul">
            <li className="text-light">{activeUser.name}</li>
          </ul>
        </div>
        <Link className="link" to={`/me/${user._id}`}>
          Edit your profile
        </Link>
      </div>
    </>
  );
};

export default UserProfileDisplay;
