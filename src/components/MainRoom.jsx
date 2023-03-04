import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const MainRoom = () => {
  const { getUsers, user, addToFavorites } = useAuth();
  const [users, setUsers] = useState();
  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    getAllUsers();
  }, [getUsers]);
  if (!users) return;

  const filteredUser = users.filter((e) => e.email === user.email);
  const filteredUsers = users.filter((e) => e.email !== user.email);
  function add({ target }) {
    console.log(target.id);
  }
  return (
    <>
      <div className="my-profile">
        <div className="user-container ">
          <div className="min-height">
            <img src={filteredUser[0].image} alt={`${filteredUser[0].name} `} />
          </div>

          <div className="my-card-body">
            <ul className="my-ul">
              <li className="text-light">{filteredUser[0].name}</li>
            </ul>
          </div>
          <Link className="link" to={`/me/${user._id}`}>
            Edit your profile
          </Link>
        </div>
      </div>

      <div className="users">
        {filteredUsers.map((user, index) => {
          if (user !== null) {
            return (
              <div className="users-container" key={index}>
                <p
                  id={user._id}
                  onClick={async () => {
                    const { data } = await addToFavorites(
                      user._id,
                      filteredUser[0].email
                    );
                    console.log('front', data);
                  }}
                >
                  add to favorite
                </p>
                <div className="min-height">
                  <img src={user.image} alt={`${user.name} `} />
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
          return filteredUsers;
        })}
      </div>
    </>
  );
};

export default MainRoom;
