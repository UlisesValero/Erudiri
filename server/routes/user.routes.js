import express from 'express'
import {
  getUsers,
  getUserById,
  postUser,
  deleteUser
} from '../controllers/user.controller.js'
import { protegerRuta } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', protegerRuta, getUsers)
router.get('/:id', protegerRuta, getUserById)
router.put('/:id', protegerRuta, postUser)
router.delete('/:id', protegerRuta, deleteUser)

export default router
