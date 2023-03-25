import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const ThankYou = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="thank-you">thank you</div>
      <Link to={`/chat-room/${user._id}`}>go back</Link>
    </div>
  );
};

export default ThankYou;
