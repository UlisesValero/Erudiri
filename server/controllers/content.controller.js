import Nivel from '../models/Nivel.js';
import Arista from '../models/Artista.js';
import Leccion from '../models/Leccion.js';

// ======== NIVELES =========
export const createLevel = async (req, res) => {
  const { companyId, title, description, order } = req.body;
  try {
    const level = new Nivel({ company: companyId, title, description, order });
    await level.save();
    res.status(201).json(level);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear nivel', error });
  }
};

export const getLevelsByCompany = async (req, res) => {
  const { companyId } = req.params;
  try {
    const levels = await Nivel.find({ company: companyId }).sort('order');
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener niveles', error });
  }
};

// ======== ARISTAS =========
export const createArista = async (req, res) => {
  const { levelId, title, order } = req.body;
  try {
    const arista = new Arista({ level: levelId, title, order });
    await arista.save();
    res.status(201).json(arista);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear arista', error });
  }
};

export const getAristasByLevel = async (req, res) => {
  const { levelId } = req.params;
  try {
    const aristas = await Arista.find({ level: levelId }).sort('order');
    res.status(200).json(aristas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener aristas', error });
  }
};

// ======== LECCIONES =========
export const createLesson = async (req, res) => {
  const { aristaId, content, audioUrl, videoUrl } = req.body;
  try {
    const lesson = new Leccion({ arista: aristaId, content, audioUrl, videoUrl });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear lección', error });
  }
};

export const getLessonByArista = async (req, res) => {
  const { aristaId } = req.params;
  try {
    const lesson = await Leccion.findOne({ arista: aristaId });
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener lección', error });
  }
};
