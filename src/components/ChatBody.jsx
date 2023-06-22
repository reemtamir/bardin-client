import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';

const ChatBody = () => {
  const { activeUser, socket } = useAuth();
  const {
    usersInChat,
    messages,
    setTypingStatus,
    lastMessageRef,
    chat,
    messageOnChat,
    setMessageOnChat,
  } = useChat();

  useEffect(() => {
    setMessageOnChat(chat?.messages);
  }, [chat, usersInChat]);

  const handleTyping = (data) => {
    if (data.userId === usersInChat[1]?._id) {
      setTypingStatus(`${usersInChat[1]?.name}, is typing`);
    } else {
      setTypingStatus(false);
    }
  };
  socket.on('typing', (data) => handleTyping(data));
  socket.on('notTyping', () => {
    setTypingStatus(false);
  });

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageOnChat]);
  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [messages]);
  return (
    <>
      <div className="message__container">
        {messageOnChat?.map((message, index) =>
          message.from === activeUser.email ? (
            <div key={index} className="message__chats">
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message?.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={index}>
              <p>{message?.from}</p>
              <div className="message__recipient">
                <p>{message?.text}</p>
              </div>
            </div>
          )
        )}

        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
