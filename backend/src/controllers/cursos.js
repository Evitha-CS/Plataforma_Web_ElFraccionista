import db from '../database.js'

export const getAllCursos = async (req, res) => {
    try {
      const cursos = await db.curso.findMany({
        include: {
          usuarios: true, 
        },
      });
  
      if (cursos.length === 0) {
        return res.status(404).json({
          message: 'No se encontraron cursos',
        });
      }
  
      return res.status(200).json(cursos);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al obtener todos los cursos',
        error: error.message,
      });
    }
  };
  
  

  export const createCurso = async (req, res) => {
    try {
      const { nombre, grado } = req.body;
      const existingCurso = await db.curso.findFirst({
        where: { nombre, grado },
      });
      if (existingCurso) {
        return res.status(400).json({
          message: 'El curso con este nombre y grado ya existe',
        });
      }
      const curso = await db.curso.create({
        data: { nombre, grado },
      });
      return res.status(201).json({
        message: 'Curso creado correctamente',
        curso,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al crear el curso',
        error: error.message,
      });
    }
  }
  


  export const deleteCurso = async (req, res) => {
    try {
      const { id } = req.params;
      const curso = await db.curso.delete({
        where: { 
          id: parseInt(id) }, 
      });
      return res.status(200).json({
        message: 'Curso eliminado correctamente',
        curso,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al eliminar el curso',
        error: error.message,
      });
    }
  };
 
  

  export const updateCurso = async (req, res) => {
    try {

      const { id } = req.params;
      const { nombre, grado } = req.body;
  
      const curso = await db.curso.update({
        where: { id: parseInt(id) },
        data: { nombre, grado },
      });
      return res.status(200).json({
        message: 'Curso actualizado correctamente',
        curso,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al actualizar el curso',
        error: error.message,
      });
    }
  }


export const addUserToCurso = async (req, res) => {
  try {
      const cursoId = parseInt(req.params.cursoId);
      const { userId } = req.body; 

      console.log('Adding user to curso:', { cursoId, userId });
      const curso = await db.curso.findUnique({ where: { id: cursoId } });

      if (!curso) {
          return res.status(404).json({
              message: 'Curso no encontrado',
          });
      }
      const parsedUserId = parseInt(userId);
      if (isNaN(parsedUserId)) {
          return res.status(400).json({
              message: 'El ID del usuario no es válido',
          });
      }

      const usuario = await db.user.findUnique({ where: { id: parsedUserId } });

      if (!usuario) {
          return res.status(404).json({
              message: 'Usuario no encontrado',
          });
      }

      await db.curso.update({
          where: { id: cursoId },
          data: {
              usuarios: {
                  connect: { id: parsedUserId },
              },
          },
      });

      return res.status(201).json({
          message: `Usuario '${usuario.nombre}' agregado al curso '${curso.grado} ${curso.nombre}`,
      });
  } catch (error) {
      console.error('Error en addUserToCurso:', error);
      return res.status(500).json({
          message: 'Error al agregar el usuario al curso',
          error: error.message,
      });
  }
};

export const getCursosByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cursos = await db.curso.findMany({
      where: {
        usuarios: {
          some: {
            id: parseInt(userId)
          }
        }
      },
      include: {
        usuarios: true
      }
    });

    if (cursos.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron cursos para el usuario',
      });
    }

    return res.status(200).json(cursos);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener cursos para el usuario',
      error: error.message,
    });
  }
};
