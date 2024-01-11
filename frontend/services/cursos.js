import axios from './axios';

export const getAllCursos = async () => {
  try {
    const res = await axios.get('/api/login/cursos');
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
};

export const createCurso = async (cursoData) => {
    try {
      const res = await axios.post('/api/login/cursos/create', cursoData);
      return res.data;
    } catch (error) {
      const newError = new Error(error.response.statusText)
      newError.status = error.response.status;
      throw newError;
    }
  };
  
export const deleteCurso = async (cursoId) => {
  try {
    const res = await axios.delete(`/api/login/cursos/${cursoId}`);
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status;
    throw newError;
  }
};

export const updateCurso = async (id, cursoData) => {
  try {
    const res = await axios.put(`/api/login/cursos/${id}`, cursoData);
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
};

export const addUserToCurso = async (cursoId, userData) => {
  try {
    const res = await axios.post(`/api/login/cursos/${cursoId}/agregar-usuario`, userData);
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
};


export const getCursosByUserId = async (userId) => {
  try {
    const response = await axios.get(`/api/login/cursos/usuario/${userId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status
    console.error('Error al obtener los cursos del usuario:', error);
    throw newError;
  }
};