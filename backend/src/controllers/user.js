import prisma from '../database/client.js';
import User from '../models/user.js';
import { ZodError } from 'zod';

const controller = {};

controller.login = async function(req, res) {
  const { email, password } = req.body;

  try {
    // Valida os dados de entrada
    const userData = User.pick({ email: true, password: true }).parse({ email, password });

    // Busca o usuário no banco de dados pelo email
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    // Verifica se o usuário existe e se a senha está correta
    if (!user || user.password !== userData.password) { // **Nota:** Senhas em texto plano são inseguras. Recomenda-se usar hashing.
      return res.status(401).send({ message: 'Email ou senha inválidos' });
    }

    // Retorna os dados do usuário (incluindo a senha apenas temporariamente)
    res.status(200).send({
      id_user: user.id_user,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password, // **Nota:** Evite retornar a senha em produção.
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).send({ errors: error.errors });
    } else {
      res.status(500).send({ message: 'Erro interno do servidor', error: error.message });
    }
  }
};

controller.create = async function(req, res) {
  try {
    const userData = User.parse(req.body);
    await prisma.user.create({ data: userData });
    res.status(201).send({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).send({ errors: error.errors });
    } else if (error.code === 'P2002') {
      res.status(409).send({ message: 'Email já está em uso' });
    } else {
      res.status(500).send({ message: 'Erro interno do servidor', error: error.message });
    }
  }
};

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.user.findMany({
      orderBy: [{ first_name: 'asc' }],
      select: {
        id_user: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        is_admin: true,
      }
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Erro interno do servidor', error: error.message });
  }
};

controller.retrieveOne = async function(req, res) {
  try {
    const userId = Number(req.params.id);
    const result = await prisma.user.findUnique({
      where: { id_user: userId },
      select: {
        id_user: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        is_admin: true,
      }
    });

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro interno do servidor', error: error.message });
  }
};

controller.update = async function(req, res) {
  try {
    const userData = User.partial().parse(req.body);
    const userId = Number(req.params.id);
    const result = await prisma.user.update({
      where: { id_user: userId },
      data: userData
    });

    if (result) {
      res.status(204).end();
    } else {
      res.status(404).send({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).send({ errors: error.errors });
    } else if (error.code === 'P2002') {
      res.status(409).send({ message: 'Email já está em uso' });
    } else {
      res.status(500).send({ message: 'Erro interno do servidor', error: error.message });
    }
  }
};

controller.delete = async function(req, res) {
  try {
    const userId = Number(req.params.id);
    const result = await prisma.user.delete({
      where: { id_user: userId }
    });
    
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).send({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro interno do servidor', error: error.message });
  }
};

export default controller;
