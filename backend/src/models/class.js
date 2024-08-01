import { z } from 'zod'

const Class = z.object({
  class: 
    z.string()
    .min(1, { message: 'O nome da categoria deve ter, no mínimo, 1 caractere' })
    .max(40, { message: 'O nome da categoria pode conter, no máximo, 40 caracteres' }),
})

export default Class