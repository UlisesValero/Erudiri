import express from 'express'
import {
  getUsers,
  getUserById,
  postUser,
  deleteUser
} from '../controllers/user.controller.js'
import { protegerRuta } from '../middleware/auth.middleware.js'

const router = express.Router()

//para testear hay que pasar el token del usuario por header, con par clave-valor Authorization: Bearer *TOKEN*
router.get('/', protegerRuta, getUsers) // funciona
router.get('/:id', protegerRuta, getUserById) // funciona
router.put('/:id', protegerRuta, postUser) // funciona - El empleado puede cambiar el rol a admin *Corregir*
router.delete('/:id', protegerRuta, deleteUser) // funciona

export default router
