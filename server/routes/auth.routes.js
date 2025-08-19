import express from 'express'
import {
  registrarUsuario,
  loginUsuario,
  perfilUsuario
} from '../controllers/auth.controller.js'
import { protegerRuta } from '../middleware/auth.middleware.js'

const router = express.Router()

//proteger ruta en register y en perfil
router.post('/register', registrarUsuario)
router.post('/login', protegerRuta, loginUsuario)
router.get('/perfil', protegerRuta, perfilUsuario)

export default router
