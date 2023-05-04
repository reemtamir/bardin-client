import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
const Home = ({ img, linkLetsGoStr, linkToInfo }) => {
  const { activeUser, setIsAdmin, isAdmin } = useAuth();
  return (
    <div className="container">
      <button type="submit" className="sign-up-btn">
        {' '}
        <Link
          to={activeUser ? `/chat-room/${activeUser._id}` : linkLetsGoStr}
          className="link-to-sign-up"
        >
          {' '}
          Let's go{' '}
        </Link>
      </button>
      <button type="submit" className="sign-up-btn">
        {' '}
        <Link to={linkToInfo} className="link-to-sign-up">
          {' '}
          Information{' '}
        </Link>
      </button>
      {!isAdmin && (
        <button
          type="submit"
          className="sign-up-btn"
          onClick={() => setIsAdmin(true)}
        >
          <Link
            to={'/admin-page'}
            className="nav-link active"
            aria-current="page"
          >
            Admin
          </Link>
        </button>
      )}
      <img style={{ width: '20rem' }} src={img} alt="logo" />
    </div>
  );
};

export default Home;
