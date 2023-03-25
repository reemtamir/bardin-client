import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const ThankYou = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(`/chat-room/${user._id}`);
    }, 3000);
  }, []);
  return (
    <div>
      <div className="thank-you">Thank you</div>
      <Link
        className="my-card-link fs-3 text-danger"
        to={`/chat-room/${user._id}`}
      >
        go back
      </Link>
    </div>
  );
};

export default ThankYou;
