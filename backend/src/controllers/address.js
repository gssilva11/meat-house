import prisma from '../database/client.js';
import { ZodError } from 'zod';

const MAX_ADDRESSES_PER_USER = 3; // Máximo de endereços por usuário

const controller = {};

// Função auxiliar para validar ID numérico
function validateId(id) {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw new Error('ID inválido');
  }
  return numericId;
}

// Criar novo endereço
controller.create = async function(req, res) {
  try {
    const { id_user } = req.body;
    
    // Verifica se o usuário já possui o número máximo de endereços permitidos
    const existingAddresses = await prisma.address.findMany({
      where: { id_user }
    });
    if (existingAddresses.length >= MAX_ADDRESSES_PER_USER) {
      return res.status(400).send({ message: 'Limite máximo de endereços atingido para este usuário.' });
    }

    const address = await prisma.address.create({
      data: req.body
    });
    res.status(201).json(address);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      res.status(422).send(error.issues);
    } else {
      res.status(500).send({ message: 'Erro interno do servidor' });
    }
  }
};

// Buscar todos os endereços
controller.retrieveAll = async function(req, res) {
  try {
    const addresses = await prisma.address.findMany();
    res.json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro interno do servidor' });
  }
};

// Buscar endereços por ID do usuário
controller.retrieveAllByUser = async function(req, res) {
  try {
    const id_user = validateId(req.params.id);
    const addresses = await prisma.address.findMany({
      where: { id_user }
    });
    res.json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro interno do servidor' });
  }
};

// Buscar um único endereço por ID
controller.retrieveOne = async function(req, res) {
  try {
    const id_address = validateId(req.params.id);
    const address = await prisma.address.findUnique({
      where: { id_address }
    });

    if (address) {
      res.json(address);
    } else {
      res.status(404).send({ message: 'Endereço não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro interno do servidor' });
  }
};

// Atualizar endereço por ID
controller.update = async function(req, res) {
  try {
    const id_address = validateId(req.params.id);
    const address = await prisma.address.update({
      where: { id_address },
      data: req.body
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      res.status(422).send(error.issues);
    } else {
      res.status(500).send({ message: 'Erro interno do servidor' });
    }
  }
};

// Deletar endereço por ID
controller.delete = async function(req, res) {
  try {
    const id_address = validateId(req.params.id);
    await prisma.address.delete({
      where: { id_address }
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro interno do servidor' });
  }
};

export default controller;
