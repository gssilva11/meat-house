import prisma from '../database/client.js';
import CuttingType from '../models/cuttingType.js';
import { ZodError } from 'zod';

const controller = {};

controller.create = async function(req, res) {
  try {
    CuttingType.parse(req.body);

    await prisma.cuttingType.create({ data: req.body });
    
    res.status(201).end();
  } catch (error) {
    console.error(error);

    // Retorna HTTP 422: Unprocessable Entity
    if (error instanceof ZodError) res.status(422).send(error.issues);
    
    // HTTP 500: Internal Server Error
    else res.status(500).send(error);
  }
};

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.cuttingType.findMany({
      orderBy: [
        { cuttingType: 'asc' }
      ]
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    // HTTP 500: Internal Server Error
    res.status(500).send(error);
  }
};

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.cuttingType.findUnique({
      where: { id_cuttingType: Number(req.params.id) }
    });

    // Encontrou: retorna HTTP 200: OK
    if (result) res.send(result);
    // Não encontrou: retorna HTTP 404: Not found
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

controller.update = async function(req, res) {
  try {
    CuttingType.parse(req.body);

    const result = await prisma.cuttingType.update({
      where: { id_cuttingType: Number(req.params.id) },
      data: req.body
    });

    if (result) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    
    if (error instanceof ZodError) res.status(422).send(error.issues);
    else res.status(500).send(error);
  }
};

controller.delete = async function(req, res) {
  try {
    const result = await prisma.cuttingType.delete({
      where: { id_cuttingType: Number(req.params.id) }
    });
    
    if (result) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default controller;
