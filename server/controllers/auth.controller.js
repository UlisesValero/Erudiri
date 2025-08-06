import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña, empresaId } = req.body;

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ message: 'El usuario ya existe' });

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña,
      empresa: empresaId,
    });

    res.status(201).json({
      _id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      token: generarToken(nuevoUsuario._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario || !(await usuario.compararContraseña(contraseña))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarToken(usuario._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const perfilUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-contraseña');
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
};
