import prisma from '../database/client.js';
import CustomerAddress from '../models/customerAddress.js';
import { ZodError } from 'zod';

const controller = {};

controller.create = async function(req, res) {
  try {
    CustomerAddress.parse(req.body);

    await prisma.customerAddress.create({ data: req.body });
    
    res.status(201).end();
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) res.status(422).send(error.issues);
    else res.status(500).send(error);
  }
};

controller.retrieveAll = async function(req, res) {
  try {
    const addresses = await prisma.customerAddress.findMany({
      orderBy: {
        id_customer: 'asc'
      }
    });

    const groupedAddresses = addresses.reduce((acc, address) => {
      if (!acc[address.id_customer]) {
        acc[address.id_customer] = [];
      }
      acc[address.id_customer].push(address);
      return acc;
    }, {});

    const result = Object.keys(groupedAddresses).map(id_customer => ({
      id_customer,
      addresses: groupedAddresses[id_customer]
    }));

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

controller.retrieveAll = async function(req, res) {
  try {
    const addresses = await prisma.customerAddress.findMany({
      where: { id_customer: Number(req.params.id) },
      orderBy: {
        id_customer: 'asc'
      }
    });

    const groupedAddresses = addresses.reduce((acc, address) => {
      if (!acc[address.id_customer]) {
        acc[address.id_customer] = [];
      }
      acc[address.id_customer].push(address);
      return acc;
    }, {});

    const result = Object.keys(groupedAddresses).map(id_customer => ({
      id_customer,
      addresses: groupedAddresses[id_customer]
    }));

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.customerAddress.findMany({
      where: { id_customer: Number(req.params.id) }
    });

    if (result.length > 0) res.send(result);
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

controller.update = async function(req, res) {
  try {
    CustomerAddress.parse(req.body);

    const result = await prisma.customerAddress.update({
      where: { id_address: Number(req.params.id) },
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
    const result = await prisma.customerAddress.delete({
      where: { id_address: Number(req.params.id) }
    });
    
    if (result) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default controller;
