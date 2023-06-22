import React from 'react';
import { useChat } from '../hooks/useChat';

const ChatBar = () => {
  const { usersInChat } = useChat();

  if (!usersInChat) return;

  return (
    <>
      <div className="chat-users-div">
        <div className="sender">
          <p>{usersInChat[0]?.name}</p>
          <img
            style={{ width: '75px' }}
            src={usersInChat[0]?.image}
            alt={usersInChat[0]?.name}
          />
        </div>

        <div className="receiver">
          <p>{usersInChat[1]?.name}</p>

          <img
            style={{ width: '75px' }}
            src={usersInChat[1]?.image}
            alt={usersInChat[1]?.name}
          />
        </div>
      </div>
    </>
  );
};

export default ChatBar;
