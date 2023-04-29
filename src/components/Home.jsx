import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
const Home = ({ img }) => {
  const { user } = useAuth();
  return (
    <div className="container">
      <img style={{ width: '50vw' }} src={img} alt="logo" />
      <button type="submit" className="sign-up-btn">
        {' '}
        <Link
          to={user ? `/chat-room/${user._id}` : '/sign-in'}
          className="link-to-sign-up"
        >
          {' '}
          Let's go{' '}
        </Link>
      </button>
      <button type="submit" className="sign-up-btn">
        {' '}
        <Link to="/info" className="link-to-sign-up">
          {' '}
          Information{' '}
        </Link>
      </button>
    </div>
  );
};

export default Home;
