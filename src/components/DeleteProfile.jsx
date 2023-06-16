import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { deleteUser } from '../utils/axiosApp';
import { toast } from 'react-toastify';

const DeleteProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { logOut, user } = useAuth();

  useEffect(() => {
    const remove = async () => {
      await deleteUser(id);
      logOut();
      navigate('/sign-up');
      toast(`${user.email} has been deleted!`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    };

    remove();
  }, []);

  return null;
};

export default DeleteProfile;
