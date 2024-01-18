import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/rutas.js'
import { PrismaClient } from '@prisma/client'
import regionRoutes from './routes/regionesruta.js';


const app = express()
const prisma = new PrismaClient()

dotenv.config()

const port = process.env.PORT || 5000
app.set('port', port)

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

app.use('/api', regionRoutes);
app.use('/api/login', authRoutes)

// Endpoint para guardar datos de partida
app.post('/api/guardar-datos-partida', async (req, res) => {
  try {
    console.log('Cuerpo de la solicitud:', req.body);
    const { usuario_ganador, partida_duracion, p1TotalFails, p2TotalFails, TotalMovesp1, TotalMovesp2, p1_ID, p2_ID } = req.body;
    console.log('Usuario ganador:', usuario_ganador);
    console.log('Partida duracion:', partida_duracion);
    console.log('p1TotalFails:', p1TotalFails);
    console.log('p2TotalFails:', p2TotalFails);
    console.log('TotalMovesp1:', TotalMovesp1);
    console.log('TotalMovesp2:', TotalMovesp2);
    console.log('p1_ID:', p1_ID);
    console.log('p1_ID:', p2_ID);


    // Guardar en la base de datos usando Prisma
    const partidaGuardada = await prisma.partida.create({
      data: {
        nombreGanador: usuario_ganador,
        tiempoDuracion: partida_duracion,
        equivocacionesJugador1: p1TotalFails,
        equivocacionesJugador2: p2TotalFails,
        movimientosJugador1: TotalMovesp1,
        movimientosJugador2: TotalMovesp2,
        jugador1Id: p1_ID,
        jugador2Id: p2_ID,

      },
    });

    console.log('Partida guardada:', partidaGuardada);

    res.status(200).json({ success: true, message: 'Datos de la partida guardados exitosamente' });
  } catch (error) {
    console.error('Error al guardar datos de la partida:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});


// Endpoint para guardar estado del juego
app.post('/api/usuario-isplaying', async (req, res) => {
  try {
    console.log('Cuerpo de la solicitud:', req.body);
    const { id_usuario, nombre_usuario, play } = req.body;

    // Guardar en la base de datos usando Prisma
    const updatedUser = await prisma.user.update({
      where: {
        id: id_usuario,          // Condición: id_usuario coincide con id en la base de datos
        nombre: nombre_usuario  // Condición: nombre_usuario coincide con nombre en la base de datos
      },
      data: {
        isPlaying: play  // Actualizar el campo isPlaying con el valor de la variable play
      },
    });

    console.log('Usuario actualizado:', updatedUser);

    res.status(200).json({ message: 'Estado del juego actualizado correctamente.' });
  } catch (error) {
    console.error('Error al actualizar el estado del juego:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});


// Endpoint para guardar jugadores en una sala
app.post('/api/usuario-isinRoom', async (req, res) => {
  try {
    console.log('Cuerpo de la solicitud:', req.body);
    const { nombre_sala, usuario1_Id, usuario2_Id } = req.body;

    // Guardar en la base de datos usando Prisma
    const CreateRoom = await prisma.salavirtual.create({
      data: {
        nombreSala: nombre_sala,
        usuario1Id: usuario1_Id,
        usuario2Id: usuario2_Id,
      },
    });

    console.log('Sala_Virtual creada:', CreateRoom);

    res.status(200).json({ message: 'Datos de la sala guardados exitosamente.' });
  } catch (error) {
    console.error('Error al guardar datos de la sala:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Endpoint para eliminar jugadores de una sala
app.post('/api/usuario-isNotInRoom', async (req, res) => {
  try {
    console.log('Cuerpo de la solicitud:', req.body);
    const { nombre_sala, usuario1_Id, usuario2_Id } = req.body;

    // Eliminar en la base de datos usando Prisma
    const deleteResult = await prisma.salavirtual.deleteMany({
      where: {
        nombreSala: nombre_sala,
        OR: [
          { usuario1Id: usuario1_Id },
          { usuario2Id: usuario2_Id },
        ],
      },
    });

    console.log('Registros eliminados:', deleteResult);

    res.status(200).json({ message: 'Datos de la sala eliminados exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar datos de la sala:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});



export default app