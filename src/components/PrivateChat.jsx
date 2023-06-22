import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';

const PrivateChat = () => {
  const { setIsAdmin, socket } = useAuth();
  const { error, chat, setAlert, setMessageOnChat, messageOnChat } = useChat();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsAdmin(false);
  }, [setIsAdmin]);

  socket.on('messageResponse', (data) => {
    if (data.chat === chat?._id) {
      setAlert('');
      messageOnChat?.length
        ? setMessageOnChat([...messageOnChat, data.message])
        : setMessageOnChat([data.message]);

      return;
    } else if (data.chat !== chat?._id) {
      setMessageOnChat(chat?.messages);
      setAlert(`New message from ${data.sender.name.toUpperCase()} `);
      setTimeout(() => {
        setAlert('');
      }, 6000);

      return;
    }
  });

  return (
    <div className="chat">
      <ChatBar />
      <div>
        <ChatBody />
        <ChatFooter message={message} setMessage={setMessage} />
      </div>

      <p>{error}</p>
    </div>
  );
};

export default PrivateChat;
