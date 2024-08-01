import prisma from '../database/client.js';
import Order from '../models/order.js';
import { ZodError } from 'zod';

const controller = {};

controller.create = async function (req, res) {
  try {
    Order.parse(req.body);

    await prisma.order.create({ data: req.body });

    res.status(201).end();
  } catch (error) {
    console.error(error);

    // Retorna HTTP 422: Unprocessable Entity
    if (error instanceof ZodError) res.status(422).send(error.issues);
    // HTTP 500: Internal Server Error
    else res.status(500).send(error);
  }
};

controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.order.findMany({
      orderBy: [{ date_order: 'asc' }],
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    // HTTP 500: Internal Server Error
    res.status(500).send(error);
  }
};

controller.retrieveOne = async function (req, res) {
  try {
    const result = await prisma.order.findUnique({
      where: { id_order: Number(req.params.id) },
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

controller.update = async function (req, res) {
  try {
    Order.parse(req.body);

    const result = await prisma.order.update({
      where: { id_order: Number(req.params.id) },
      data: req.body,
    });

    if (result) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) res.status(422).send(error.issues);
    else res.status(500).send(error);
  }
};

controller.delete = async function (req, res) {
  try {
    const result = await prisma.order.delete({
      where: { id_order: Number(req.params.id) },
    });

    if (result) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

controller.retrieveByUserIdAndStatus = async function (req, res) {
  const { userId, status_ne } = req.query;
  try {
    const orders = await prisma.order.findMany({
      where: {
        id_customer: Number(userId),
        NOT: { status: status_ne },
      },
      include: {
        orderItems: {
          include: {
            product: true,
            cuttingType: true,
          },
        },
      },
      orderBy: { date_order: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default controller;
