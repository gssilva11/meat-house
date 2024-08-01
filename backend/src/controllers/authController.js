import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET_KEY; // Usando a variável de ambiente

// Função para gerar um token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, is_admin: user.is_admin }, secretKey, { expiresIn: '1h' });
};

// Login do usuário
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      res.cookie('auth_token', token, { httpOnly: true });
      return res.status(200).send({ message: 'Login successful' });
    } else {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
};

// Verificação de rota protegida
export const protectedRoute = (req, res) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return res.status(200).send({ message: 'Protected content', user: decoded });
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token', error: error.message });
  }
};
