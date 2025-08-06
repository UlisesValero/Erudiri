import Usuario from '../models/Usuario.js'

export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña')
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
}

export const getUserById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-contraseña')
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario' })
  }
}

export const postUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-contraseña')
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id)
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' })
  }
}
