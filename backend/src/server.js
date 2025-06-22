import dotenv from 'dotenv';
import app from './app.js';
import { connectToMongo } from './config/mongo.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectToMongo();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
