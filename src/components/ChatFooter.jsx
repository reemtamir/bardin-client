import { React } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';

const ChatFooter = ({ message, setMessage }) => {
  const { activeUser, socket } = useAuth();
  const {
    setMessageOnChat,
    messageOnChat,
    usersInChat,
    chat,
    setChat,
    typingStatus,
  } = useChat();
  const handleTyping = () => {
    socket.emit('typing', {
      socketId: usersInChat[1].socketId,
      userId: activeUser._id,
    });
  };
  const handleNotTyping = () => {
    socket.emit('notTyping', { socketId: usersInChat[1].socketId });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message && activeUser) {
      socket.emit('message', {
        from: activeUser.email,
        to: usersInChat[1].email,
        text: message.trim(),
      });
    }
    setMessage('');
    setMessageOnChat((messages) => [
      ...messages,
      { from: activeUser.email, to: usersInChat[1].email, text: message },
    ]);

    setChat({
      ...chat,
      messages: [
        ...messageOnChat,
        { from: activeUser.email, to: usersInChat[1].email, text: message },
      ],
    });
  };
  return (
    <div className="chat__footer">
      {/*This is triggered when a user is typing*/}
      <div className="message__status">
        <p>{typingStatus}</p>
      </div>
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
