import db from '../database.js'

export const monitorCurso = async (req, res) => {
  const { cursoId } = req.params;

  try {
    const usuariosConectados = await db.user.count({
      where: {
        isPlaying: true,
        cursos: {
          some: {
            id: parseInt(cursoId),
          },
        },
      },
    });

    // Consulta para obtener detalles de todas las salas disponibles
    const detallesSalas = await db.salavirtual.findMany({
      where: {
        OR: [
          {
            usuario1: {
              isPlaying: true,
              cursos: {
                some: {
                  id: parseInt(cursoId),
                },
              },
            },
          },
          {
            usuario2: {
              isPlaying: true,
              cursos: {
                some: {
                  id: parseInt(cursoId),
                },
              },
            },
          },
        ],
      },
      include: {
        usuario1: true, // Incluir detalles del usuario1
        usuario2: true, // Incluir detalles del usuario2
      },
    });

    res.json({ usuariosConectados, detallesSalas });
  } catch (error) {
    console.error('Error en el monitoreo del curso:', error);
    res.status(500).json({ error: "Error al procesar la solicitud de monitoreo" });
  }
};
