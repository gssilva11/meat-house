import prisma from '../database/client.js'
import Product from "../models/product.js"

const controller = {}

controller.create = async function(req, res) {
  try {
    Product.parse(req.body)

    await prisma.product.create({ data: req.body })
    
    res.status(201).end()
  }
  catch (error){
    console.error(error)

    // Retorna HTTP 422: Unprocessable Entity
    if(error instanceof ZodError) res.status(422).send(error.issues)
    
    // HTTP 500: Internal Server Error
    else res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.product.findMany({
      orderBy: [
        { name: 'asc' }
      ]
    })
    res.send(result)
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.product.findUnique({
      where: { id_product: Number(req.params.id) }
    })

    // Encontrou: retorna HTTP 200: OK
    if(result) res.send(result)
    // Não encontrou: retorna HTTP 404: Not found
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    Product.parse(req.body)

    const result = await prisma.product.update({
      where: { id_product: Number(req.params.id) },
      data: req.body
    })

    if(result) res.status(204).end()
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    
    if(error instanceof ZodError) res.status(422).send(error.issues)
    
    else res.status(500).send(error)
  }
}

controller.delete = async function(req, res) {
  try {
    const result = await prisma.product.delete({
      where: { id_product: Number(req.params.id) }
    })
    
    if(result) res.status(204).end()
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

// Adiciona o método de busca
controller.search = async function(req, res) {
  const { search } = req.query;
  try {
    const result = await prisma.product.findMany({
      where: {
        name: {
          startsWith: search,
          mode: 'insensitive' // Faz a busca sem diferenciar maiúsculas e minúsculas
        }
      },
      orderBy: [
        { name: 'asc' }
      ]
    })
    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export default controller
