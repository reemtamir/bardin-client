import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import Home from './Home';
import AdminNavBar from './AdminNavBar';

const AdminPage = () => {
  const { admin } = useAuth();
  const { setIsInMainPage } = useApp();

  return (
    <>
      <AdminNavBar />
      {!admin && (
        <Home
          img={
            'https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg'
          }
          linkLetsGoStr={'/sign-in-admin'}
          linkToInfo={'/admin-info'}
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
