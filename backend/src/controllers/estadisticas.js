import db from '../database.js'
import { getUserNameById } from './user.js';

export const estadisticasPorUsuario = async (usuarioId, nombreUsuario) => {
  // Total de partidas jugadas
  const partidasJugadas = await db.partida.count({
    where: {
      OR: [
        { jugador1Id: usuarioId },
        { jugador2Id: usuarioId }
      ]
    }
  });

  // Total de victorias
  const victorias = await db.partida.count({
    where: {
      nombreGanador: nombreUsuario
    }
  });

  // Total de derrotas
  const derrotas = partidasJugadas - victorias;

  // Total de errores cometidos por el usuario
  const erroresJugador1 = await db.partida.aggregate({
    _sum: {
      equivocacionesJugador1: true
    },
    where: {
      jugador1Id: usuarioId
    }
  });

  const erroresJugador2 = await db.partida.aggregate({
    _sum: {
      equivocacionesJugador2: true
    },
    where: {
      jugador2Id: usuarioId
    }
  });

  const totalErrores = (erroresJugador1._sum.equivocacionesJugador1 || 0) + 
                       (erroresJugador2._sum.equivocacionesJugador2 || 0);

  return {
    usuarioId: usuarioId,
    partidasJugadas: partidasJugadas,
    victorias: victorias,
    derrotas: derrotas,
    errores: totalErrores
  };
};


export const estadisticasPorPartida = async (usuarioId) => {
    try {
      const nombreUsuario = await getUserNameById(usuarioId);
      const partidas = await db.partida.findMany({
        where: {
          OR: [
            { jugador1Id: usuarioId },
            { jugador2Id: usuarioId },
          ],
        },
        select: {
          id: true,
          nombreGanador: true,
          tiempoDuracion: true,
          equivocacionesJugador1: true,
          equivocacionesJugador2: true,
          movimientosJugador1: true,
          movimientosJugador2: true,
          jugador1Id: true,
          jugador2Id: true,
          jugador1: {
            select: {
              nombre: true
            }
          },
          jugador2: {
            select: {
              nombre: true
            }
          },
          createdAt: true,
        },
      });
  
      const estadisticas = partidas.map(partida => {
        const esGanador = partida.nombreGanador === nombreUsuario;
       const errores = usuarioId === partida.jugador1Id ? partida.equivocacionesJugador1 : partida.equivocacionesJugador2;
      const movimientos = usuarioId === partida.jugador1Id ? partida.movimientosJugador1 : partida.movimientosJugador2;
        return {
          partidaId: partida.id,
          ganador: esGanador,
          tiempoDuracion: partida.tiempoDuracion,
          errores: errores,
          movimientos: movimientos,
          fecha: partida.createdAt,
          jugador1Nombre: partida.jugador1?.nombre,
          jugador2Nombre: partida.jugador2?.nombre,
        };
      });
  
      return estadisticas;
    } catch (error) {
      console.error('Error al obtener las estadísticas por partida:', error);
      throw error;
    }
  };