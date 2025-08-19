import express from 'express'
import {
  getUsers,
  getUserById,
  putUser,
  deleteUser
} from '../controllers/user.controller.js'
import { protegerRuta } from '../middleware/auth.middleware.js'

const router = express.Router()

// token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTQ3NGU2OTkxMzlmNjk2ZTZiNDVlYSIsImlhdCI6MTc1NTYwODI5NCwiZXhwIjoxNzU4MjAwMjk0fQ.uSv8hpsTg8Z9vyqv5eem3FVuEUbpKazne6N6NFD1VgY
// user  68a474e699139f696e6b45ea

//para testear hay que pasar el token del usuario por header, con par clave-valor Authorization: Bearer *TOKEN*
router.get('/', protegerRuta, getUsers) // funciona
router.get('/:id', protegerRuta, getUserById) // funciona
router.put('/:id', protegerRuta, putUser) // funciona 
router.delete('/:id', protegerRuta, deleteUser) // funciona

export default router
