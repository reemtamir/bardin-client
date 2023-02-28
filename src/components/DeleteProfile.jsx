import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { deleteUser } from '../utils/axios';

const DeleteProfile = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const { logOut } = useAuth();
  console.log(email);
  useEffect(() => {
    if (!email) return;
    const remove = async () => {
      await deleteUser(email);
      logOut();
      navigate('/sign-up');
    };

    remove();
  }, []);
  return null;
};

export default DeleteProfile;
