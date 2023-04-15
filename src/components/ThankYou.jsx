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
  }, [navigate, user._id]);
  return (
    <div>
      <div className="thank-you">
        <img
          src="https://media.istockphoto.com/id/1397892955/photo/thank-you-message-for-card-presentation-business-expressing-gratitude-acknowledgment-and.jpg?s=612x612&w=0&k=20&c=7Lyf2sRAJnX_uiDy3ZEytmirul8pyJWm4l2fxiUtdvk="
          alt="thank you"
        />
      </div>
      <Link
        className="my-card-link fs-3 text-danger"
        to={`/chat-room/${user._id}`}
      >
        Go back
      </Link>
    </div>
  );
};

export default ThankYou;
