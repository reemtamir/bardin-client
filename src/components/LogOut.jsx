import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import { useChat } from '../hooks/useChat';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const { logOut, setIsAdmin, setActiveUser } = useAuth();
  const {
    setFavoriteUsers,
    setBlockedUsers,
    setOtherUsers,
    setVipMessage,
    setUsersWhoDidNotBlockedMe,
  } = useApp();
  const { setError, setChatUsersEmail, setUsersInChat, setMessageOnChat } =
    useChat();
  const navigate = useNavigate();

  useEffect(() => {
    logOut();
    setIsAdmin(false);
    setFavoriteUsers([]);
    setBlockedUsers([]);
    setActiveUser(null);
    setOtherUsers([]);
    setError('');
    setVipMessage('');
    setUsersWhoDidNotBlockedMe([]);
    setChatUsersEmail([]);
    setUsersInChat([]);
    setMessageOnChat([]);
    navigate('/sign-in');
  }, [logOut, navigate]);

  return null;
};

export default LogOut;
