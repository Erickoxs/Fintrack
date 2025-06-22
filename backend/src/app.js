import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar tus rutas
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

export default app;
