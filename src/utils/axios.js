import axios from 'axios';
import jwtDecode from 'jwt-decode';
axios.defaults.baseURL = 'http://localhost:3000';
setTokenHeader();

///USER
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
export const getUsers = async () => {
  const { data } = await axios.get('/users');
  return data;
};
export const getFavorites = async (id) => {
  const { data } = await axios.get(`/users/get-favorites/${id}`);
  return data;
};
export const getNotFavorites = async (id) => {
  const { data } = await axios.get(`/users/get-not-favorites/${id}`);
  return data;
};
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

////ADMIN
export const signUpAdmin = async (values) => {
  try {
    await axios.post('/admin', {
      ...values,
    });
  } catch ({ response }) {
    return response.data.error;
  }
};

export const signInAdmin = async (values) => {
  try {
    const { data } = await axios.post(`/admin/sign-in`, values);
    localStorage.setItem('token', data);
    setTokenHeader();
    return data;
  } catch ({ response }) {
    console.log('error', response.data);
  }
};

export function getJwt() {
  return localStorage.getItem('token');
}
export function setTokenHeader() {
  return (axios.defaults.headers.common['x-auth-token'] = getJwt());
}
