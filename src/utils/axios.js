import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useAuth } from '../hooks/useAuth';
axios.defaults.baseURL = 'http://localhost:3000';
setTokenHeader();
export const signUp = async (values) => {
  try {
    await axios.post('/users', {
      ...values,
    });
  } catch ({ response }) {
    console.log('response', response);
  }
};
export const signIn = async (values) => {
  try {
    const { data } = await axios.post('/auth', values);
    localStorage.setItem('token', data);
    setTokenHeader();
    return data;
  } catch ({ response }) {
    console.log('error', response);
  }
};
export const getUsers = async () => {
  const { data } = await axios.get('/users');
  return data;
};
export function getJwt() {
  return localStorage.getItem('token');
}
export function setTokenHeader() {
  return (axios.defaults.headers.common['auth-token'] = getJwt());
}

export const myProfile = async (email) => {
  return await axios.get(`/me/${email}`);
};
export function getUser() {
  try {
    return jwtDecode(getJwt());
  } catch {
    return null;
  }
}
export async function UseUser(email) {
  return axios.get(`/me/${email}`);
}
export async function updateUser(email, user) {
  return await axios.put(`/me/${email}`, user);
}
export async function deleteUser(email) {
  return await axios.delete(`/delete/${email}`);
}
