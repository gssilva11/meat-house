import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  // Obtém o token dos cookies
  const token = req.cookies.auth_token;

  // Se não houver token, retorna status 401 (Não autorizado)
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, secretKey);

    // Anexa as informações do usuário à requisição
    req.user = decoded;

    // Chama a próxima função middleware ou rota
    next();
  } catch (error) {
    // Se a verificação falhar, retorna status 401 (Token inválido)
    return res.status(401).send({ message: 'Invalid token', error: error.message });
  }
};
