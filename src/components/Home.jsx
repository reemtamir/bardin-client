import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
const Home = ({ img, linkLetsGoStr, linkToInfo }) => {
  const { activeUser, setIsAdmin, isAdmin } = useAuth();
  return (
    <div className="container">
      <div className="btns-div">
        <div className="user-btns-div">
          <button type="submit" className="sign-in-btn">
            {' '}
            <Link
              to={activeUser ? `/chat-room/${activeUser._id}` : linkLetsGoStr}
              className="link-to-sign-up "
            >
              {' '}
              Let's go{' '}
            </Link>
          </button>
          <button type="submit" className="sign-in-btn">
            {' '}
            <Link to={linkToInfo} className="link-to-sign-up">
              {' '}
              Information{' '}
            </Link>
          </button>
        </div>
        {!isAdmin && (
          <button
            type="submit"
            className="sign-up-btn admin-btn"
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
      </div>
      <img style={{ width: '20rem' }} src={img} alt="logo" />
    </div>
  );
};

export default Home;
