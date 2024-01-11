import db from '../database.js'
import { verifyToken } from '../services/jwt.js'

export const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) throw new Error()

    const { uid } = verifyToken(token)

    const user = await db.user.findFirst({ where: { id: uid } })
    if (!user) throw new Error()

    req.user = {
      id: user.id, email: user.email, nombre: user.nombre, role: user.role
    }

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'El usuario no se ha autenticado'
    })
  }
}

export const permit = (...roles) => {
  return async (req, res, next) => {
    const { role } = req.user

    if (!roles.includes(role)) {
      return res.status(403).json({
        message: 'El usuario no tiene acceso permitido'
      })
    }

    next()
  }
}
