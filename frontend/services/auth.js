// services/authService.js

import axios from './axios';

export const signUp = async (user) => {
  try {
    const res = await axios.post('/api/login/signup', user);
  
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText);
    newError.status = error.response.status;

    throw newError;
  }
};

export const signIn = async (email, password) => {
  try {
    const res = await axios.post('/api/login/signin', { email, password });
    
    return res.data;
  } catch (error) {
    const status = error.response.status;
    console.log(status);
    console.log(error.response.data.message);
    let message = 'Hubo un error al iniciar sesión';

    if (error.response.data && error.response.data.errorType) {
      switch (error.response.data.errorType) {
        case 'incorrect_password':
          message = 'La contraseña es incorrecta';
          break;
        case 'user_not_found':
          message = 'El usuario no existe';
          break;
        default:
          break;
      }
    }

    const newError = new Error(message);
    newError.status = status;

    throw newError;
  }
};

export const signOut = async () => {
  try {
    const res = await axios.post('/api/login/signout');

    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText);
    newError.status = error.response.status;

    throw newError;
  }
};

export const verifyAuth = async () => {
  try {
    const res = await axios.post('/api/login/verify');

    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText);
    newError.status = error.response.status;

    throw newError;
  }
};
