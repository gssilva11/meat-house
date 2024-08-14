import prisma from '../database/client.js';
import Class from '../models/class.js';
import { ZodError } from 'zod';

const controller = {};

// Create a new class entry
controller.create = async function(req, res) {
  try {
    Class.parse(req.body);  // Validate the request body with Zod
    
    await prisma.class.create({ data: req.body });
    
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

// Retrieve all class entries
controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.class.findMany({
      orderBy: [
        { class: 'asc' }  // Updated to use the correct field
      ]
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Retrieve a single class entry by ID
controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.class.findUnique({
      where: { class: req.params.id }  // Updated to use the correct field
    });

    if (result) res.send(result);
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Update a class entry by ID
controller.update = async function(req, res) {
  try {
    Class.parse(req.body);  // Validate the request body with Zod

    const result = await prisma.class.update({
      where: { class: req.params.id },  // Updated to use the correct field
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

// Delete a class entry by ID
controller.delete = async function(req, res) {
  try {
    const result = await prisma.class.delete({
      where: { class: req.params.id }  // Updated to use the correct field
    });
    
    if (result) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default controller;
