import axios from 'axios';
import jwtDecode from 'jwt-decode';

axios.defaults.baseURL = 'http://localhost:3000';

setTokenHeader();

///USER
export const signUp = async (values) => {
  return await axios.post('/users', {
    ...values,
  });
};
export const signIn = async (values) => {
  return await axios.post(`/auth`, values);
};
export const getUsers = async () => {
  const { data } = await axios.get('/users');
  return data;
};
export const getUsersWhoDidNotBlockedMe = async (id) => {
  const { data } = await axios.get(`/users/${id}`);

  return data;
};
export const getFavorites = async (id) => {
  const { data } = await axios.get(`/users/get-favorites/${id}`);
  return data;
};
export const getBlocked = async (id) => {
  const { data } = await axios.get(`/users/get-blocked/${id}`);
  return data;
};
export const getNotFavorites = async (id) => {
  const { data } = await axios.get(`/users/get-not-favorites/${id}`);
  if (!data) return;
  return data;
};
export async function addToFavorites(id, email) {
  return await axios.post(`/me/favorites/${id}`, { email });
}
export async function removeFromFavorites(id, email) {
  return await axios.post(`/me/remove-favorites/${id}`, { email });
}

export async function blockUser(id, email) {
  return await axios.post(`/me/block/${id}`, { email });
}
export async function unblockUser(id, email) {
  return await axios.post(`/me/remove-block/${id}`, { email });
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
  } catch (response) {
    return null;
  }
}

export const createVipReq = async (details) => {
  return axios.post('/users/vip', details);
};

////ADMIN
export const signUpAdmin = async (values) => {
  return await axios.post('/admin', {
    ...values,
  });
};

export const signInAdmin = async (values) => {
  return await axios.post(`/admin/sign-in`, values);
};

export const getVipReq = async () => {
  return await axios.get('/admin/vip-req');
};

export const updateVip = async (id, email, isVip) => {
  try {
    return await axios.put(`/admin/change-vip/${id}?email=${email}`, { isVip });
  } catch (error) {
    console.log(error);
  }
};
export const deleteVipReq = async (id, email) => {
  try {
    const { data } = await axios.post(`/admin/delete-vip-req/${id}`, {
      email,
    });
  } catch ({ response }) {
    console.log('response.data', response.data);
  }
};
export function getJwt() {
  return localStorage.getItem('token');
}
export function setTokenHeader() {
  return (axios.defaults.headers.common['x-auth-token'] = getJwt());
}
