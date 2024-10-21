import { ZodError } from 'zod'; // Importa ZodError
import prisma from '../database/client.js';
import Product from '../models/product.js';

const controller = {};

// Método para criar um produto
controller.create = async function(req, res) {
  try {
    // Arredonda o valor do preço para duas casas decimais e mantém como número
    req.body.price = parseFloat(Number(req.body.price).toFixed(2));

    // Valida o produto com o esquema Zod
    Product.parse(req.body);

    // Cria o produto no banco de dados
    await prisma.product.create({ data: req.body });
    
    res.status(201).end();
  } catch (error) {
    console.error(error);

    // Se o erro for do tipo ZodError, envia os problemas de validação
    if (error instanceof ZodError) {
      res.status(422).send(error.issues);
    } else {
      // Caso contrário, envia erro 500
      res.status(500).send(error);
    }
  }
};

// Método para recuperar todos os produtos
controller.retrieveAll = async function(req, res) {
  try {
    // Busca todos os produtos e os ordena por nome em ordem ascendente
    const result = await prisma.product.findMany({
      orderBy: [{ name: 'asc' }]
    });
    
    res.send(result);
  } catch (error) {
    console.error(error);
    // Retorna erro 500
    res.status(500).send(error);
  }
};

// Método para recuperar um único produto por ID
controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.product.findUnique({
      where: { id_product: Number(req.params.id) }
    });

    // Se o produto for encontrado, retorna com status 200
    if (result) res.send(result);
    // Se não for encontrado, retorna 404
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Método para atualizar um produto existente
controller.update = async function(req, res) {
  try {
    // Arredonda o valor do preço para duas casas decimais e mantém como número
    req.body.price = parseFloat(Number(req.body.price).toFixed(2));

    // Valida os dados com o esquema Zod
    Product.parse(req.body);

    // Atualiza o produto no banco de dados
    const result = await prisma.product.update({
      where: { id_product: Number(req.params.id) },
      data: req.body,
    });

    // Se a atualização foi bem-sucedida, retorna 204 (sem conteúdo)
    if (result) res.status(204).end();
    // Se o produto não for encontrado, retorna 404
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    
    // Se o erro for do tipo ZodError, envia os problemas de validação
    if (error instanceof ZodError) {
      res.status(422).send(error.issues);
    } else {
      // Caso contrário, envia erro 500
      res.status(500).send(error);
    }
  }
};

// Método para deletar um produto
controller.delete = async function(req, res) {
  try {
    // Deleta o produto pelo ID
    const result = await prisma.product.delete({
      where: { id_product: Number(req.params.id) }
    });
    
    // Se a exclusão for bem-sucedida, retorna 204 (sem conteúdo)
    if (result) res.status(204).end();
    // Se o produto não for encontrado, retorna 404
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Método de busca por nome do produto
controller.search = async function(req, res) {
  const { search } = req.query;
  try {
    // Realiza a busca no banco de dados pelo nome do produto que começa com o termo informado
    const result = await prisma.product.findMany({
      where: {
        name: {
          startsWith: search,
          mode: 'insensitive' // Busca sem diferenciar maiúsculas e minúsculas
        }
      },
      orderBy: [{ name: 'asc' }]
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default controller;
