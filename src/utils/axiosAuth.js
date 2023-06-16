import axios from 'axios';
import jwtDecode from 'jwt-decode';

axios.defaults.baseURL = 'http://localhost:4000';

setTokenHeader();

export const signUp = async (values) => {
  return await axios.post('/users', {
    ...values,
  });
};

export const signIn = async (values) => {
  return await axios.post(`/auth`, values);
};

export function getUser() {
  try {
    return jwtDecode(getJwt());
  } catch (error) {
    return null;
  }
}

export const signUpAdmin = async (values) => {
  return await axios.post('/admin', {
    ...values,
  });
};

export const signInAdmin = async (values) => {
  return await axios.post(`/auth/sign-in`, values);
};

export function getJwt() {
  return localStorage.getItem('token');
}

export function setTokenHeader() {
  return (axios.defaults.headers.common['x-auth-token'] = getJwt());
}
