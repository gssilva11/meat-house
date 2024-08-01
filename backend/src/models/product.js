import { z } from 'zod'

const Product = z.object({
  name: 
    z.string()
    .min(1, { message: 'O nome do produto deve ter, no mínimo, 1 caractere' })
    .max(40, { message: 'O nome do produto pode conter, no máximo, 40 caracteres' }),
  
  price: 
    z.number()
    .min(1, { message: 'O preço deve ser maior que R$0,00' })
    .max(10000, { message: 'O preço não pode exceder R$10.000,00' })
})

export default Product