import { Router } from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory
} from '../controllers/CategoryController.js';
import { authenticate } from '../middlewares/auth.js'; // si quieres proteger las rutas

const router = Router();

// Proteger rutas con JWT si lo deseas
router.get('/',  getCategories);
router.post('/',  createCategory);
router.delete('/:id',  deleteCategory);

export default router;
