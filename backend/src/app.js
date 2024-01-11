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
    

    
    //const jugador1 = 1;
    //const jugador2 = 2;
    
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

export default app