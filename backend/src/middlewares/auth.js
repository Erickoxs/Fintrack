import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET || '';

  

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    

    if (!decoded.userId) {
      
      return res.status(401).json({ message: 'Token no válido: sin userId' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
