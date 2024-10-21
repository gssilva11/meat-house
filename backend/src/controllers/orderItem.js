import prisma from '../database/client.js';
import OrderItem from '../models/orderItem.js';
import { ZodError } from 'zod';

const controller = {};

// Função auxiliar para formatar números decimais com duas casas
function formatDecimal(value) {
  return parseFloat(value).toFixed(2);
}

// Criar um item de pedido
controller.create = async function (req, res) {
  try {
    OrderItem.parse(req.body);

    // Formatar os valores decimais de quantidade e preço
    const formattedQuantity = formatDecimal(req.body.quantity);
    const formattedPriceOnTheDay = formatDecimal(req.body.priceOnTheDay);

    // Criar o item de pedido com valores formatados
    const orderItem = await prisma.orderItem.create({
      data: {
        id_order: req.body.id_order,
        id_product: req.body.id_product,
        cuttingType: req.body.cuttingType,
        quantity: formattedQuantity,
        priceOnTheDay: formattedPriceOnTheDay,
        description: req.body.description || '-',
      },
    });

    // Recalcular o total da ordem
    const totalOrder = await prisma.orderItem.aggregate({
      _sum: {
        priceOnTheDay: true,
      },
      where: {
        id_order: req.body.id_order,
      },
    });

    // Atualizar o total da ordem com o novo valor formatado
    await prisma.order.update({
      where: { id_order: req.body.id_order },
      data: { total: formatDecimal(totalOrder._sum.priceOnTheDay || 0) },
    });

    res.status(201).json(orderItem);
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      res.status(422).send(error.issues);
    } else {
      res.status(500).send(error);
    }
  }
};

// Buscar todos os itens de pedido
controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.orderItem.findMany({
      include: {
        product: true, // Relacionamento correto com o produto
      },
    });

    // Formatar os resultados para garantir que os valores de quantidade e preço tenham duas casas decimais
    const formattedResult = result.map(item => ({
      ...item,
      quantity: formatDecimal(item.quantity),
      priceOnTheDay: formatDecimal(item.priceOnTheDay),
      product: {
        ...item.product,
        price: formatDecimal(item.product.price),
      },
    }));

    res.send(formattedResult);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Buscar um item de pedido específico por ID
controller.retrieveOne = async function (req, res) {
  try {
    const result = await prisma.orderItem.findUnique({
      where: { id_orderItem: Number(req.params.id) },
      include: {
        product: true,
      },
    });

    if (result) {
      // Formatar os valores de quantidade e preço
      const formattedResult = {
        ...result,
        quantity: formatDecimal(result.quantity),
        priceOnTheDay: formatDecimal(result.priceOnTheDay),
        product: {
          ...result.product,
          price: formatDecimal(result.product.price),
        },
      };

      res.send(formattedResult);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Atualizar um item de pedido existente
controller.update = async function (req, res) {
  try {
    OrderItem.parse(req.body);

    // Formatar os valores de quantidade e preço
    const formattedQuantity = formatDecimal(req.body.quantity);
    const formattedPriceOnTheDay = formatDecimal(req.body.priceOnTheDay);

    const updatedItem = await prisma.orderItem.update({
      where: { id_orderItem: Number(req.params.id) },
      data: {
        ...req.body,
        quantity: formattedQuantity,
        priceOnTheDay: formattedPriceOnTheDay,
      },
    });

    // Recalcular o total da ordem após a atualização
    const totalOrder = await prisma.orderItem.aggregate({
      _sum: {
        priceOnTheDay: true,
      },
      where: {
        id_order: updatedItem.id_order,
      },
    });

    // Atualizar o total da ordem com o valor formatado
    await prisma.order.update({
      where: { id_order: updatedItem.id_order },
      data: { total: formatDecimal(totalOrder._sum.priceOnTheDay || 0) },
    });

    if (updatedItem) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      res.status(422).send(error.issues);
    } else {
      res.status(500).send(error);
    }
  }
};

// Deletar um item de pedido
controller.delete = async function (req, res) {
  try {
    const deletedItem = await prisma.orderItem.delete({
      where: { id_orderItem: Number(req.params.id) },
    });

    // Recalcular o total da ordem após deletar o item
    const totalOrder = await prisma.orderItem.aggregate({
      _sum: {
        priceOnTheDay: true,
      },
      where: {
        id_order: deletedItem.id_order,
      },
    });

    // Atualizar o total da ordem com o valor formatado
    await prisma.order.update({
      where: { id_order: deletedItem.id_order },
      data: { total: formatDecimal(totalOrder._sum.priceOnTheDay || 0) },
    });

    if (deletedItem) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default controller;
