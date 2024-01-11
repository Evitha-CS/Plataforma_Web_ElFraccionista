import axios from './axios';

export const getAllUsers = async () => {
  try {
    const res = await axios.get('/api/login/users');
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
}; 
export const getUsersByRole = async (role) => {
  try {
    const res = await axios.get(`/api/login/users/role/${role}`);
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
};
export const getUsersByCurso = async (curso, grado) => {
  try {
    const response = await axios.get(`/api/login/users/curso/${curso}/grado/${grado}`
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateUser = async (userId, userData) => {
  try {
    const res = await axios.put(`/api/login/users/${userId}`, userData);
    console.log(axios);
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText);
    newError.status = error.response.status;

    throw newError;
  }
};

