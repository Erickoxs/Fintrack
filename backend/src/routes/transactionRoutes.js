import { Router } from 'express';
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionsByMonth,
  getTransactionsByYear,
  getTransactionsByCategory,
  getTransactionsByType
} from '../controllers/transaction.controller.js';

import { authenticate } from '../middlewares/auth.js';

const router = Router();

// Proteger todas las rutas con JWT
router.use(authenticate);

// CRUD básico
router.get('/', getTransactions);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);

// Filtros
router.get('/by-month', getTransactionsByMonth); // ?month=6&year=2025
router.get('/by-year', getTransactionsByYear);   // ?year=2025
router.get('/by-category/:categoryId', getTransactionsByCategory); // /:categoryId
router.get('/by-type', getTransactionsByType);   // ?type=ingreso

export default router;
