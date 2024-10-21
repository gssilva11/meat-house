import prisma from '../database/client.js';
import Order from '../models/order.js';
import { ZodError } from 'zod';

const controller = {};

// Finalizar pedido
controller.create = async function (req, res) {
  try {
    Order.parse(req.body); // Valida o corpo da requisição com Zod

    // Criar a ordem com total inicial 0 e horário atual
    const order = await prisma.order.create({
      data: {
        id_user: req.body.id_user,
        id_address: req.body.id_address,
        datetime_order: new Date(), // Pega o horário atual automaticamente
        status: 'AWAITING', // Define o status como Aguardando
        total: 0, // Inicialmente total 0
      },
    });

    let totalOrder = 0;

    // Iterar sobre os itens do pedido (recebidos via req.body.orderItems)
    for (const item of req.body.orderItems) {
      // Criar os itens de pedido e associá-los à ordem
      const orderItem = await prisma.orderItem.create({
        data: {
          id_order: order.id_order,
          id_product: item.id_product,
          cuttingType: item.cuttingType,
          quantity: item.quantity,
          priceOnTheDay: item.priceOnTheDay,
          description: item.description || '-',
        },
      });

      // Calcular o total com base nos itens de pedido
      totalOrder += item.priceOnTheDay * item.quantity;
    }

    // Atualizar o total da ordem
    await prisma.order.update({
      where: { id_order: order.id_order },
      data: { total: totalOrder },
    });

    res.status(201).json({ message: 'Pedido finalizado com sucesso!', order });

  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      res.status(422).send(error.issues); // Validação Zod falhou
    } else {
      res.status(500).send(error); // Erro interno do servidor
    }
  }
};

// Buscar todas as ordens
controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.order.findMany({
      orderBy: [{ datetime_order: 'asc' }],
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Buscar ordem específica por ID
controller.retrieveOne = async function (req, res) {
  try {
    const result = await prisma.order.findUnique({
      where: { id_order: Number(req.params.id) },
      include: {
        orderItems: {
          include: {
            product: true,
            cuttingType: true,
          },
        },
      },
    });

    if (result) res.send(result);
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Atualizar uma ordem
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

// Deletar uma ordem
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

// Buscar ordens por ID do usuário e status (excluindo um status específico)
controller.retrieveByUserIdAndStatus = async function (req, res) {
  const { userId, status_ne } = req.query;
  try {
    const orders = await prisma.order.findMany({
      where: {
        id_user: Number(userId),
        NOT: { status: status_ne }, // Excluir status especificado
      },
      include: {
        orderItems: {
          include: {
            product: true,
            cuttingType: true,
          },
        },
      },
      orderBy: { datetime_order: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default controller;
