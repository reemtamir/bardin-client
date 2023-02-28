import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import MainRoom from './MainRoom';

const ChatBar = ({ socket }) => {
  const { getUsers } = useAuth();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getAllUsers = async function () {
      const data = await getUsers();

      setUsers(data);
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      // setUsers(data);
    });
  }, [socket, users]);
  if (!users) return;
  return (
    <div className="container">
      <MainRoom />
    </div>
  );
};

export default ChatBar;
