import express from 'express';
import {
  createCompany,
  getCompanies,
  getCompanyById,
  postCompany,
  deleteCompany
} from '../controllers/company.controller.js';
import { protegerRuta } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', createCompany);
router.get('/', protegerRuta, getCompanies);
router.get('/:id', protegerRuta, getCompanyById);
router.put('/:id', protegerRuta, postCompany);
router.delete('/:id', protegerRuta, deleteCompany);

export default router;
