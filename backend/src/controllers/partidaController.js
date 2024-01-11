import db from '../database.js'

export const guardarDatosPartida = async (req, res) => {
  try {
    const { ganador, duracion, fallosJugador1, fallosJugador2, movimientosJugador1, movimientosJugador2 } = req.body;

    // Guardar datos en la base de datos usando Prisma
    await db.partida.create({
      data: {
        nombreGanador: ganador,
        tiempoDuracion: duracion,
        equivocacionesJugador1: fallosJugador1,
        equivocacionesJugador2: fallosJugador2,
        movimientosJugador1: movimientosJugador1,
        movimientosJugador2: movimientosJugador2,
      },
    });

    res.status(200).json({ success: true, message: 'Datos de partida guardados con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al guardar datos de partida' });
  }
};


