import { z } from 'zod'

const CuttingType = z.object({
  cuttingType: 
    z.string()
    .min(1, { message: 'O nome do corte deve ter, no mínimo, 1 caractere' })
    .max(64, { message: 'O nome do corte pode conter, no máximo, 64 caracteres' }),
})

export default CuttingType