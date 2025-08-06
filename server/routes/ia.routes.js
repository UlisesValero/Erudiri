import express from 'express';
import { generarContenidoIA } from '../controllers/ia.controller.js';

const router = express.Router();

// Simula generación automática con IA
router.post('/generar', generarContenidoIA);

export default router;
