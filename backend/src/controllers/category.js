import prisma from '../database/client.js';
import Category from '../models/category.js';
import { ZodError } from 'zod';

const controller = {};

controller.create = async function(req, res) {
  try {
    Category.parse(req.body);  // Validate the request body with Zod
    
    await prisma.category.create({ data: req.body });
    
    res.status(201).end();
  } catch (error) {
    console.error(error);

    // Return HTTP 422: Unprocessable Entity if there's a Zod validation error
    if (error instanceof ZodError) {
      res.status(422).send(error.issues);
    } else {
      // Return HTTP 500: Internal Server Error for other errors
      res.status(500).send(error);
    }
  }
};

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.category.findMany({
      orderBy: [
        { category: 'asc' }  // Updated to use the correct field
      ]
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.category.findUnique({
      where: { id_category: Number(req.params.id) },
    });

    if (result) res.send(result);
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

controller.update = async function(req, res) {
  try {
    Category.parse(req.body);  // Validate the request body with Zod

    const result = await prisma.category.update({
      where: { id_category: Number(req.params.id) },
      data: req.body
    });

    if (result) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    
    if (error instanceof ZodError) {
      res.status(422).send(error.issues);
    } else {
      res.status(500).send(error);
    }
  }
};

controller.delete = async function(req, res) {
  try {
    const result = await prisma.category.delete({
      where: { id_category: Number(req.params.id) },
    });
    
    if (result) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default controller;
