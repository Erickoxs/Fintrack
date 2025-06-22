import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('⚠️ Token no proporcionado o formato incorrecto');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET || '';

  console.log('🧪 Token recibido:', token);
  console.log('🔑 JWT_SECRET usado:', JWT_SECRET);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('✅ Token decodificado:', decoded);

    if (!decoded.userId) {
      console.log('❌ Token válido pero sin userId');
      return res.status(401).json({ message: 'Token no válido: sin userId' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('❌ Error al verificar token:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
