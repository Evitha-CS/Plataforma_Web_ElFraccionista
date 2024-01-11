import { validationResult } from 'express-validator'

const validation = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log('Errores de validación:', errors.array());

    // Devuelve una respuesta de error con los errores de validación
    return res.status(400).json({ errors: errors.array() });
  }

  next()
}

export default validation
