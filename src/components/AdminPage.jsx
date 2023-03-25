import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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

      {admin && (
        <div>
          <p>hello admin</p>
          <Link
            onClick={() => setIsInMainPage(false)}
            to={`/edit-users/${admin._id}`}
          >
            click to see and edit users
          </Link>
          <div>
            {' '}
            <Link to={`/vip-req-list`}>req</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
