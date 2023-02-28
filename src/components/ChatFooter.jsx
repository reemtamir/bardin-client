import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';

const ChatFooter = ({ socket }) => {
  const { UseUser, user } = useAuth();
  const [message, setMessage] = useState('');
  const [onlineUser, setOnlineUser] = useState();
  useEffect(() => {
    const getUser = async function () {
      const { data } = await UseUser(user.email);
      setOnlineUser(data);
      socket.emit('newUser', data);
    };
    getUser();
  }, [user]);
  const handleTyping = () => {
    socket.emit('typing', `${onlineUser.name} is typing`);
  };
  const handleNotTyping = () => {
    setTimeout(() => {
      socket.emit('typing', ``);
    }, 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && onlineUser) {
      socket.emit('message', {
        text: message,
        name: onlineUser.name,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          onKeyUp={handleNotTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
