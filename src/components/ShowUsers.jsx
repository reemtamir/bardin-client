import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ShowUsers = ({ users, str, fn }) => {
  const { user, setUser } = useAuth();
  if (!users) return;

  return (
    <>
      {users.map((element, index) => (
        <div key={index} className="users-container">
          <i
            className={`${str}`}
            id={element._id}
            onClick={async () => {
              const result = await fn(element._id, user.email);

           
              return result;
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
