import axios from './axios';

export const getCursoMonitoreo = async (cursoId) => {
    try {
      const response = await axios.get(`/api/login/cursos/${cursoId}/monitoreo`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos de monitoreo del curso:', error);
      throw new Error('Error al obtener datos de monitoreo del curso');
    }
  };



export const actualizarEstadoJuego = async (userId, isPlaying) => {
  try {
    await axios.put(`/api/login/users/${userId}/update-playing`, { userId, isPlaying });
  } catch (error) {
    console.error('Error al actualizar el estado del juego:', error);
  }
};