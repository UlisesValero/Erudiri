import jwt from 'jsonwebtoken'
import {userModel} from '../models/Usuario.js'

export const protegerRuta = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no enviado' })
  }

  try {
    const token = auth.split(' ')[1]
    const decodificado = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = await userModel.findById(decodificado.id).select('-contraseña')
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' })
  }
}
