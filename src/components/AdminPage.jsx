import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Home from './Home';
import AdminNavBar from './AdminNavBar';

const AdminPage = () => {
  const { admin, getUsers, setIsInMainPage } = useAuth();
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
      {!admin && (
        <Home
          img={
            'https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg'
          }
        />
      )}
      {admin && (
        <div className="admin-page-container">
          <p className="admin-page-p">
            Hello, <span>{admin.name}</span>
          </p>
          <Link
            className="my-card-link fs-3 text-danger"
            onClick={() => setIsInMainPage(false)}
            to={`/edit-users/${admin._id}`}
          >
            Click to see and edit users
          </Link>
          <div>
            {' '}
            <Link
              className="my-card-link fs-3 text-danger"
              to={`/vip-req-list`}
            >
              Click to see Vip req
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
