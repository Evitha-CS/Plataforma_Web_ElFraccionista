import db from '../database.js';


export const getAllUsers = async (req, res) => {
  try {
   
    const users = await db.user.findMany();


    if (users.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron usuarios',
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener todos los usuarios',
      error: error.message,
    });
  }
}
export const getUsersByCurso = async (req, res) => {
  try {
    const { curso, grado } = req.params; 


    const cursoExistente = await db.curso.findFirst({
      where: {
        nombre: curso,
        grado: parseInt(grado),
      },
    });

    if (!cursoExistente) {
      return res.status(404).json({
        message: `El curso '${grado} ${curso}'  no existe`,
      });
    }

    //usuarios por curso y grado
    const users = await db.user.findMany({
      where: {
        cursos: {
          some: {
            nombre: curso,
            grado: parseInt(grado),
          },
        },
      },
    });

    const cantidadEstudiantes = users.length;

    if (users.length === 0) {
      return res.status(404).json({
        message: `No se encontraron usuarios en el curso '${curso}' y grado '${grado}'`,
      });
    }

    return res.status(200).json({
      estudiantes: users,
      cantidadEstudiantes, // Incluye la cantidad de estudiantes en la respuesta
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener usuarios por curso y grado',
      error: error.message,
    });
  }
};


export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params; 

    
    const users = await db.user.findMany({
      where: {
        role,
      },
    });


    if (users.length === 0) {
      return res.status(404).json({
        message: `No se encontraron usuarios con el rol '${role}'`,
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener usuarios por rol',
      error: error.message,
    });
  }
};



export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, regionId, ciudadId, telefono } = req.body;

    const existingUser = await db.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: 'El usuario no existe',
      });
    }

    const updatedUser = await db.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password,
        regionId: regionId ? parseInt(regionId) : undefined,
        ciudadId: ciudadId ? parseInt(ciudadId) : undefined,
        telefono,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el usuario',
      error: error.message,
    });
  }
};

export const getUserNameById = async (userId) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { nombre: true } 
    });
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    return user.nombre;
  } catch (error) {
    throw new Error(`Error al obtener el nombre del usuario: ${error.message}`);
  }
};

