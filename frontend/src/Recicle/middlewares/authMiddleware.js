import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY; // Certifique-se de que sua variável de ambiente esteja definida

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Acesso negado, token ausente' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Token inválido ou expirado' });
    }
    req.user = user; // Armazena os dados do usuário no request
    next(); // Continua para a próxima função na rota
  });
};
