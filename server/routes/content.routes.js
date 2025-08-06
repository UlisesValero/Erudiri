import express from 'express';
import {
  createLevel,
  getLevelsByCompany,
  createArista,
  getAristasByLevel,
  createLesson,
  getLessonByArista
} from '../controllers/content.controller.js';

const router = express.Router();

// Niveles
router.post('/levels', createLevel);
router.get('/levels/:companyId', getLevelsByCompany);

// Aristas
router.post('/aristas', createArista);
router.get('/aristas/:levelId', getAristasByLevel);

// Lecciones
router.post('/lessons', createLesson);
router.get('/lessons/:aristaId', getLessonByArista);

export default router;
