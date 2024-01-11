import axios from './axios';

export const obtenerRegiones = async () => {
  try {
    const res = await axios.get('/api/regiones');
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText);
    newError.status = error.response.status;
    throw newError;
  }
};

export const obtenerComunasPorRegion = async (regionId) => {
  try {
    const res = await axios.get(`/api/regiones/${regionId}/comunas`);
    return res.data;
  } catch (error) {
    const newError = new Error(error.response.statusText);
    newError.status = error.response.status;
    throw newError;
  }
};