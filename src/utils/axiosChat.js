import axios from 'axios';
import { io } from 'socket.io-client';

axios.defaults.baseURL = 'http://localhost:4000';
export const socket = io.connect('http://localhost:4000', {
  transports: ['websocket', 'polling'],
  allowEIO3: true,
});
export async function createChat(users) {
  return await axios.post(`/chat`, users);
}

export async function getChat(users) {
  return await axios.post(`/chat/get-chat`, users);
}

export const myProfileByEmail = async (email) => {
  return await axios.post(`/me/email`, { email });
};
