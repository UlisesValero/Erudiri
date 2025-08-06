import express from 'express';
import {
  crearEvaluacion,
  obtenerEvaluacionPorArista,
  enviarRespuestas
} from '../controllers/evaluation.controller.js';

const router = express.Router();

// Crear evaluación (admin o IA)
router.post('/', crearEvaluacion);

// Obtener evaluación para una arista
router.get('/:aristaId', obtenerEvaluacionPorArista);

// Enviar respuestas de un usuario
router.post('/:aristaId/responder', enviarRespuestas);

export default router;
