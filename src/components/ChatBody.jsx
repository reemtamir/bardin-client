import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {
  const { myProfile, user } = useAuth();

  const [onlineUser, setOnlineUser] = useState();
  useEffect(() => {
    const getUser = async function () {
      const { data } = await myProfile(user._id);
      setOnlineUser(data);
    };
    getUser();
  }, [user]);

  // const handleLeaveChat = () => {
  //   localStorage.removeItem('user');
  //   navigate('/');
  //   window.location.reload();
  // };

  return (
    <>
      {/* <header className="chat__mainHeader">
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header> */}

      <div className="message__container">
        {messages.map((message, index) =>
          message.name === onlineUser.name ? (
            <div key={index} className="message__chats">
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={index}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
