const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Faça login para continuar.' });
  }

  
  const token = authHeader.split(' ')[1];

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Sessão expirada ou token inválido.' });
  }
};

module.exports = authMiddleware;