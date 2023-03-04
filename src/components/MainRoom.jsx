import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const MainRoom = () => {
  const { getUsers, user, addToFavorites } = useAuth();
  const [users, setUsers] = useState();
  const [addToFav, setAddToFav] = useState(false);
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
                {!addToFav && (
                  <i
                    id={user._id}
                    onClick={async () => {
                      await addToFavorites(user._id, filteredUser[0].email);
                      setAddToFav(!addToFav);
                    }}
                    className="bi bi-star "
                  ></i>
                )}
                {addToFav && (
                  <i
                    className="bi bi-star-fill"
                    id={user._id}
                    onClick={async () => {
                      // await addToFavorites(user._id, filteredUser[0].email);
                      setAddToFav(!addToFav);
                    }}
                  ></i>
                )}

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
