import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { deleteUser } from '../utils/axios';

const DeleteProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { logOut } = useAuth();

  useEffect(() => {
    const remove = async () => {
      await deleteUser(id);
      logOut();
      navigate('/sign-up');
    };

    remove();
  }, []);
  return null;
};

export default DeleteProfile;
