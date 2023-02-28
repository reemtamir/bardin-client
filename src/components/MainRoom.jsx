import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const MainRoom = () => {
  const { getUsers, user } = useAuth();
  const [users, setUsers] = useState();
  console.log('user', user);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    getAllUsers();
  }, []);
  if (!users) return;
  const filteredUser = users.filter((e) => e.email === user.email);
  const filteredUsers = users.filter((e) => e.email !== user.email);
  console.log('filters', filteredUser);
  console.log('users', users);
  return (
    <>
      <div className="my-profile">
        <div className="user-container ">
          <div className="min-height">
            <img
              src={filteredUser[0].image}
              alt={`${filteredUser[0].name} image`}
            />
          </div>

          <div className="my-card-body">
            <ul className="my-ul">
              <li className="text-light">{filteredUser[0].name}</li>
            </ul>
            <Link to={`/me/${user.email}`} className="link">
              Edit your profile
            </Link>
          </div>
        </div>
      </div>

      <div className="users">
        {filteredUsers.map((user, index) => {
          if (user !== null) {
            return (
              <div className="users-container" key={index}>
                <div className="min-height">
                  <img src={user.image} alt={`${user.name} image`} />
                </div>

                <div className="card-body">
                  <ul className="ul">
                    <li>
                      {user.name}, {user.age}
                    </li>
                  </ul>
                </div>
                <Link className="link" to="/private">
                  Send private message
                </Link>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default MainRoom;
