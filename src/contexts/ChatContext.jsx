import React, { useRef } from 'react';
import { createContext, useState } from 'react';
import { createChat, myProfileByEmail, getChat } from '../utils/axiosChat';
import { useAuth } from '../hooks/useAuth';

export const context = createContext(null);

const ChatContext = ({ children }) => {
  const [chatUsersEmail, setChatUsersEmail] = useState([]);
  const [usersInChat, setUsersInChat] = useState([]);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState(false);
  const lastMessageRef = useRef(null);
  const [messageOnChat, setMessageOnChat] = useState([]);
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('');
  const { activeUser } = useAuth();

  const getUsers = async (user1, user2) => {
    const sender = await myProfileByEmail(user1);
    const receiver = await myProfileByEmail(user2);

    setUsersInChat([sender.data, receiver.data]);

    const { data: chat } = await getChat([sender.data, receiver.data]);
    return chat;
  };

  const defineUsers = (users) => {
    const user1 = users.find((u) => u === activeUser.email);
    const user2 = users.find((u) => u !== activeUser.email);

    return [user1, user2];
  };

  const loadChat = async (users) => {
    const definedUsers = defineUsers(users);
    const newChat = await getUsers(definedUsers[0], definedUsers[1]);
    return setChat(newChat);
  };

  const fetchChat = async (user, element) => {
    const { data } = await createChat([
      user.email.toString(),
      element.email.toString(),
    ]);

    setChatUsersEmail(data.users);
    return await loadChat(data.users);
  };

  return (
    <>
      <context.Provider
        value={{
          setChatUsersEmail,
          chatUsersEmail,
          createChat,
          myProfileByEmail,
          usersInChat,
          setUsersInChat,
          getChat,
          chat,
          setChat,
          messages,
          setMessages,
          typingStatus,
          setTypingStatus,
          lastMessageRef,
          messageOnChat,
          setMessageOnChat,
          alert,
          setAlert,
          error,
          setError,
          fetchChat,
        }}
      >
        {children}
      </context.Provider>
    </>
  );
};

export default ChatContext;
