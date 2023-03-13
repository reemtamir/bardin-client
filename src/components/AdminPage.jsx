import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import AdminNavBar from './AdminNavBar';

const AdminPage = () => {
  const { admin, getUsers } = useAuth();
  const [users, setUsers] = useState([]);
  console.log('admin', admin);
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
          <Link to={`/edit-users/${admin._id}`}>
            click to see and edit users
          </Link>
        </div>
      )}
    </>
  );
};

export default AdminPage;
