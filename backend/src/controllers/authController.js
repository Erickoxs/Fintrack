import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'clave_por_defecto';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      created_at: new Date()
    });

    await newUser.save();

    return res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Intentando login con:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Usuario no encontrado');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    console.log('✅ Usuario autenticado. Generando token...');
    console.log('🔑 JWT_SECRET usado para firmar:', JWT_SECRET);

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    console.log('🧾 Token generado:', token);

    return res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('💥 Error en login:', error.message);
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};
