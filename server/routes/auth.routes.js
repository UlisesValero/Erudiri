import express from 'express';
import {
  registrarUsuario,
  loginUsuario,
  perfilUsuario
} from '../controllers/auth.controller.js';
import { protegerRuta } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', protegerRuta, perfilUsuario);

export default router;
