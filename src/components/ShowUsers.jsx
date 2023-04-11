import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ShowUsers = ({ users, str, fn }) => {
  const [usersToShow, setUsersToshow] = useState([]);
  const { user, blockUserById } = useAuth();
  if (!users) return;
  const toShow = [];
  return (
    <>
      {users.map((element, index) => {
        user.blockList.map((el) => {
          if (el._id.toString() !== element._id.toString()) {
            toShow.push(element);
          } else {
            console.log('null');
          }
          return toShow;
        });
        console.log(toShow, 'toShow');
        return (
          <div key={index} className="users-container">
            <i
              className={`bi bi-dash-circle-fill`}
              id={element._id}
              onClick={async () => {
                const data = await blockUserById(user.email, element._id);

                return data;
              }}
            ></i>
            <i
              className={`${str}`}
              id={element._id}
              onClick={async () => {
                const data = await fn(user.email, element._id);

                return data;
              }}
            ></i>

            <div className="min-height">
              <img src={element.image} alt={`${element.name} `} />
            </div>

            <div className="card-body">
              <ul className="ul">
                <li>
                  {element.name}, {element.age}
                </li>
              </ul>
            </div>
            <Link className="link" to="/private">
              Send private message
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ShowUsers;
