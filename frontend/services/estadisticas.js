import axios from './axios';

export const getUsuarioEstadisticas = async (usuarioId) => {
  try {
    const response = await axios.get(`/api/login/usuario/${usuarioId}/estadisticas`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener las estadísticas:', error);
    throw new Error('Error al obtener las estadísticas');
  }
};



export const getDetallesPartida = async (usuarioId) => {
    try {
      const response = await axios.get(`/api/login/usuario/${usuarioId}/estadisticas/partidas`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas por partida:', error);
      throw error;
    }
};
  


