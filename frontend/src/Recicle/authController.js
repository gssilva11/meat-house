import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../../backend/src/database/client.js'; // Ajuste para apontar para a sua configuração de Prisma

const secretKey = process.env.JWT_SECRET_KEY; // Certifique-se de que essa variável de ambiente esteja definida

// Função para cadastrar o usuário
export const signup = async (req, res) => {
  const { first_name, last_name, phone, email, password } = req.body;

  try {
    // Verifica se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).send({ message: 'Email já está em uso' });
    }

    // Faz o hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Cria o novo usuário com a senha criptografada
    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        phone,
        email,
        password: hashedPassword,  // Salva o hash da senha
        is_admin: false,           // Define o padrão como não administrador
      }
    });

    res.status(201).send({ message: 'Usuário criado com sucesso', user: { id: newUser.id_user, email: newUser.email } });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).send({ message: 'Erro ao criar usuário', error: error.message });
  }
};

// Função para fazer login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Senha inválida' });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user.id_user, is_admin: user.is_admin }, secretKey, { expiresIn: '1h' });

    res.status(200).send({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send({ message: 'Erro ao fazer login', error: error.message });
  }
};

// Rota protegida de exemplo
export const protectedRoute = (req, res) => {
  res.status(200).send({ message: 'Esta é uma rota protegida', user: req.user });
};
