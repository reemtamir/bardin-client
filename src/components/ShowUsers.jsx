import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ShowUsers = ({ users, str, fn }) => {
  const { user } = useAuth();
  if (!users) return;

  return (
    <>
      {users.map((element, index) => (
        <div key={index} className="users-container">
          <i
            className={`${str}`}
            id={element._id}
            onClick={async () => {
              const data = await fn(user.email, element._id);
              console.log('data', data);
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
      ))}
    </>
  );
};

export default ShowUsers;
