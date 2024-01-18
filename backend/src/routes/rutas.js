import { Router } from 'express'
import { signUp, signIn, signOut, verifyAuth } from '../controllers/login.js'
import { guardarDatosPartida } from '../controllers/partidaController.js';
import * as user from '../controllers/user.js';
import * as cursos from '../controllers/cursos.js';
import * as stats from '../controllers/estadisticas.js';
import { monitorCurso } from '../controllers/monitorController.js';


const router = Router()
//login
router.post('/signup', signUp)
router.post('/signin',  signIn)
router.post('/signout', signOut)
router.post('/verify', verifyAuth)

//PARA COMPARAR EL NOMBRE TAMBIEN
router.get('/usuario/:id/estadisticas', async (req, res) => {
    try {
      const usuarioId = parseInt(req.params.id);
      const nombreUsuario = await user.getUserNameById(usuarioId);
  
      if (!nombreUsuario) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }
  
      const estadisticas = await stats.estadisticasPorUsuario(usuarioId, nombreUsuario);
      res.json(estadisticas);
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener las estadísticas del usuario: ${error.message}`,
      });
    }
});

router.get('/usuario/:id/estadisticas/partidas', async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.id);
        const estadisticas = await stats.estadisticasPorPartida(usuarioId);
        res.json(estadisticas);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener estadísticas por partida',
            error: error.message
        });
    }
});


//USUARIOS
router.get('/users', user.getAllUsers);
router.get('/users/role/:role', user.getUsersByRole);
router.get('/users/curso/:curso/grado/:grado', user.getUsersByCurso);
router.put('/users/:id', user.updateUser);
router.put('/users/:userId/update-playing', user.actualizarEstadoJuego);

//monitoreo
router.get('/cursos/:cursoId/monitoreo', monitorCurso);

//CURSOS
router.get('/cursos', cursos.getAllCursos);
router.post('/cursos/create', cursos.createCurso);
router.put('/cursos/:id', cursos.updateCurso);
router.delete('/cursos/:id', cursos.deleteCurso);
router.post('/cursos/:cursoId/agregar-usuario', cursos.addUserToCurso);
router.get('/cursos/usuario/:userId', cursos.getCursosByUserId);

// Ruta para guardar datos de partida
router.post('/guardar-datos-partida', guardarDatosPartida);

export default router
