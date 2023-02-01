import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getUsers } from '../utils/axios';
import ChatPage from './ChatPage';
const MainRoom = ({ socket, user }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    getAllUsers();
  }, []);
  return (
    <>
      <div className="row">
        <Link to="/your-profile" className="text-center text-decoration-none">
          Your profile
        </Link>
      </div>
      <div className="row">
        {users.map((user, index) => {
          if (user !== null) {
            return (
              <div
                key={index}
                className="card col col-4 mx-3 my-3"
                style={{ width: '18rem' }}
              >
                <img
                  src={user.img}
                  className="card-img-top"
                  alt={`${user.name} image`}
                />
                <h2 className="text-center">{user.name}</h2>
                <div className="card-body">
                  {/* <p className="card-text">{user.aboutMe}</p> */}
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{user.gender}</li>
                    <li className="list-group-item">age: {getAge(user.age)}</li>
                    {/* <li className="list-group-item">height: {user.height}</li>
  
                      <li className="list-group-item">weight: {user.weight}</li> */}
                    <Link className="text-center" to="/private">
                      Send private message
                    </Link>
                  </ul>
                </div>
              </div>
            );
          }
        })}
      </div>
      <ChatPage socket={socket} />
    </>
  );
};

export default MainRoom;
