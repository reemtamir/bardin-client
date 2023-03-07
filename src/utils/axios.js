import axios from 'axios';
import jwtDecode from 'jwt-decode';
axios.defaults.baseURL = 'http://localhost:3000';
setTokenHeader();
export const signUp = async (values) => {
  try {
    await axios.post('/users', {
      ...values,
    });
  } catch ({ response }) {
    return response.data.error;
  }
};
export const signIn = async (values) => {
  try {
    const { data } = await axios.post(`/auth`, values);
    localStorage.setItem('token', data);
    setTokenHeader();
    return data;
  } catch ({ response }) {
    console.log('error', response.data);
  }
};
export const getUsersById = async (usersId) => {
  try {
    const { data } = await axios.get('/users/get-by-id', {
      params: {
        usersIdList: usersId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
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

export const myProfile = async (id) => {
  return await axios.get(`/me/${id}`);
};
export function getUser() {
  try {
    return jwtDecode(getJwt());
  } catch {
    return null;
  }
}
export async function addToFavorites(id, email) {
  return await axios.post(`/me/favorites/${id}`, { email });
}
export async function removeFromFavorites(id, email) {
  return await axios.post(`/me/remove-favorites/${id}`, { email });
}
export async function updateUser(id, user) {
  return await axios.put(`/me/edit/${id}`, user);
}
export async function deleteUser(id) {
  return await axios.delete(`/me/delete/${id}`);
}
