import React, { useState } from 'react';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('');
  let user = localStorage.getItem('user');
  user = JSON.parse(user);
  const handleTyping = () => {
    socket.emit('typing', `${user.name} is typing`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && user) {
      console.log('Gggg');
      socket.emit('message', {
        text: message,
        name: user.name,
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
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
