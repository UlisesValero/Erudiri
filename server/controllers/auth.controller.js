import jwt from 'jsonwebtoken'
import { userModel } from '../models/Usuario.js'
import dotenv from 'dotenv'
dotenv.config()

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

//Para que permanezca logueado, agregar caja en la sección de login para activar esta funcionalidad
// const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// res.status(201).json({ usuario: nuevoUsuario, token })

export const registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña, rol } = req.body
  try {
    const existe = await userModel.findOne({ email })
    if (existe) return res.status(400).json({ message: 'El usuario ya existe' })

    const nuevoUsuario = await userModel.create({
      nombre,
      email,
      contraseña,
      rol,
    })
    console.log(nuevoUsuario)
    res.status(201).json({
      _id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      token: generarToken(nuevoUsuario._id),
    })
  } catch (err) {
  console.error('Error al registrar usuario:', err)
  res.status(500).json({ message: 'Error al registrar usuario' })  }
}

export const loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body

  try {
    const usuario = await userModel.findOne({ email });

    if (!usuario || !(await usuario.compararContraseña(contraseña))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarToken(usuario._id),
    })
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
}

export const perfilUsuario = async (req, res) => {
  try {
    const usuario = await userModel.findById(req.usuario.id).select('-contraseña');
    res.json(usuario)
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
}
