import express from 'express'
import {
  getUserProgress,
  updateUserProgress,
  canAccessArista
} from '../controllers/progress.controller.js'


const router = express.Router()

router.get('/:userId', getUserProgress)

router.post('/update', updateUserProgress)

router.get('/can-access/:userId/:aristaId', canAccessArista)

export default router
