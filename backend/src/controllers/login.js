import bcrypt from 'bcryptjs'
import db from '../database.js'
import { generateToken, deleteToken, verifyToken } from '../services/jwt.js'

export const signUp = async (req, res) => {
  try {
    const { email, nombre, password, regionId, ciudadId, telefono } = req.body;

    
    const region = await db.region.findUnique({ where: { id: regionId } });
    const ciudad = await db.ciudad.findUnique({ where: { id: ciudadId } });

    if (!region || !ciudad) {
      return res.status(400).json({
        message: 'La región o la ciudad proporcionadas no son válidas',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await db.user.create({
      data: {
        email,
        nombre,
        password: hash,
        region: {
          connect: { id: regionId },
        },
        ciudad: {
          connect: { id: ciudadId }, 
        },
        telefono,
      },
    });

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findFirst({
      where: { email },
      include: {
        region: true, 
        ciudad: true, 
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'El usuario no existe',
        errorType: 'user_not_found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña es incorrecta',
        errorType: 'incorrect_password',
      });
    }

    const token = generateToken({ uid: user.id }, res);

    return res.json({
      success: true,
      message: 'El usuario ha iniciado sesión correctamente',
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        role: user.role,
        region: user.region ? user.region.nombre : '', 
        ciudad: user.ciudad ? user.ciudad.nombre : '', 
        telefono: user.telefono
      },
      token,
    });
  } catch (error) {
    console.error('Error en signIn:', error);
    return res.status(500).json({
      success: false,
      message: 'Hubo un error al iniciar sesión',
      errorType: 'unknown_error',
      errorMessage: error.message, 
    });
  }
};





export const signOut = (_req, res) => {
  deleteToken(res)

  return res.json({
    message: 'El usuario ha cerrado sesión correctamente'
  })
}

export const verifyAuth = async (req, res) => {
  try {
    const { token } = req.cookies
    if (!token) throw new Error()

    const { uid } = verifyToken(token)

    const user = await db.user.findFirst({ where: { id: uid },include: {
      region: true, 
      ciudad: true, 
    }, })
    if (!user) throw new Error()

    console.log("Usuario autenticado:", user);
    
    return res.json({
      message: 'El usuario esta autenticado',
      user: {
        id: user.id, email: user.email, nombre: user.nombre, role: user.role, region: user.region ? user.region.nombre : '', 
        ciudad: user.ciudad ? user.ciudad.nombre : '',  telefono: user.telefono
      }
    })
  } catch (error) {
    return res.status(401).json({
      message: 'El usuario no se ha autenticado'
    })
  }
}
