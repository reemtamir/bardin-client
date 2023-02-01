import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000';
export const signUp = async (values) => {
  try {
    await axios.post('/users', {
      ...values,
    });
  } catch (error) {
    console.log('error', error);
  }
};
export const signIn = async (values) => {
  try {
    const { data } = await axios.post('/sign-in', values);

    return data;
  } catch (error) {
    console.log('error', error);
  }
};
export const getUsers = async () => {
  const { data } = await axios.get('/users');
  return data;
};
