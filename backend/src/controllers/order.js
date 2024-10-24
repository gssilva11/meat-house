import prisma from '../database/client.js';
import Order from '../models/order.js';
import { ZodError } from 'zod';

const controller = {};

controller.create = async function (req, res) {
  try {
    // Valida o corpo da requisição com Zod
    Order.parse(req.body);

    // Cria a ordem com total inicial 0 e horário atual
    const order = await prisma.order.create({
      data: {
        id_user: req.body.id_user, // Aqui conectamos o usuário através do ID
        id_address: req.body.id_address || null,
        datetime_order: new Date(),
        status: 'AWAITING',
        total: 0,
      },
    });

    let totalOrder = 0;

    // Verifica se há itens de pedido
    if (req.body.orderItems && req.body.orderItems.length > 0) {
      // Cria os itens de pedido em paralelo
      const orderItemsPromises = req.body.orderItems.map(async (item) => {
        // Verifica se o cuttingType existe na tabela CuttingType
        const cuttingType = await prisma.cuttingType.findUnique({
          where: { id_cuttingType: item.cuttingType },
        });

        // Se o cuttingType não existir, lança um erro
        if (!cuttingType) {
          throw new Error(`Tipo de corte com ID ${item.cuttingType} não encontrado. Verifique o ID e tente novamente.`);
        }

        totalOrder += item.priceOnTheDay * item.quantity; // Calcula o total para cada item

        // Cria os itens de pedido e os associa à ordem
        return prisma.orderItem.create({
          data: {
            id_order: order.id_order,
            id_product: item.id_product,
            cuttingType: cuttingType.cuttingType, // Atribui a string do tipo de corte
            quantity: item.quantity,
            priceOnTheDay: item.priceOnTheDay,
            description: item.description || '-',
          },
        });
      });

      // Aguarda a criação de todos os itens de pedido
      await Promise.all(orderItemsPromises);
    }

    // Atualiza o total da ordem após todos os itens serem criados
    await prisma.order.update({
      where: { id_order: order.id_order },
      data: { total: totalOrder },
    });

    // Responde com sucesso
    res.status(201).json({ message: 'Pedido finalizado com sucesso!', order });

  } catch (error) {
    console.error(error);

    // Tratar erros de validação Zod
    if (error instanceof ZodError) {
      res.status(422).json({ errors: error.issues });
    } else {
      // Retornar um erro genérico ou específico se o cuttingType não existir
      res.status(400).json({ message: error.message || 'Erro ao processar o pedido' });
    }
  }
};


controller.retrieveByUserIdAndStatus = async function (req, res) {
  const { userId, status_ne } = req.query;
  try {
    const orders = await prisma.order.findMany({
      where: {
        id_user: Number(userId),
        NOT: { status: status_ne },
      },
      include: {
        orderItem: { // Ajuste para o singular "orderItem"
          include: {
            product: true,
            cuttingType: true, // cuttingType é string, então pode manter assim
          },
        },
        user: true,   // Inclui os dados do usuário
        address: true, // Inclui os dados do endereço
      },
      orderBy: { datetime_order: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
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
        orderItem: { // Corrigido de 'orderItems' para 'orderItem'
          include: {
            product: true,
            id_cuttingType: true, // Correto: referência ao modelo CuttingType pelo campo 'id_cuttingType'
          },
        },
        user: true, // Inclui dados do usuário
        address: true, // Inclui dados do endereço
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
