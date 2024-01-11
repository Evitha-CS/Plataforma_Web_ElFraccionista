import jwt from 'jsonwebtoken'

export const generateToken = (payload, res) => {
  const expiresIn = 60 * 60 * 24 * 30

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })

  res.cookie('token', token, {
    secure: (process.env.MODE === 'production'),
    expires: new Date(Date.now() + expiresIn * 1000)
  })

  return token
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const deleteToken = (res) => {
  return res.clearCookie('token')
}
