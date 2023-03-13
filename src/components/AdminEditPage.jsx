import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminNavBar from './AdminNavBar';
import { Link } from 'react-router-dom';
const AdminEditPage = () => {
  const { getUsers } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await getUsers();
      setUsers(allUsers);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <AdminNavBar />
      <Link to={'/admin-page'}>Go back</Link>
      <div style={{ gap: '2rem' }} className="users w-75 ">
        {users.map((element, index) => {
          return (
            <div
              style={{ minWidth: '14rem' }}
              key={index}
              className="users-container "
            >
              <li
                value={element.email}
                onClick={({ target: { __reactProps$5yb4waj1bx } }) => {}}
              >
                VIP-{element.vip.toString()}
              </li>
              <div className="min-height">
                <img src={element.image} alt={`${element.name} `} />
              </div>

              <div className="card-body ">
                <ul className="ul ">
                  <li className="fs-6">{element.name}</li>
                  <li className="fs-6">{element.email}</li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AdminEditPage;
