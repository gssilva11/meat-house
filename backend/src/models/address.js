import { z } from 'zod'

const Address = z.object({

  id_user: 
    z.number(),
  
  street_name: 
    z.string()
    .max(64, { message: 'O nome da rua pode conter, no máximo, 64 caracteres' }),
  
  house_number: 
    z.number()
    .max(999999999, { message: 'O número pode conter, no máximo, 9 caracteres' }),
  
  complements: 
    z.string()
    .max(20, { message: 'O complemento pode conter, no máximo, 20 caracteres' })
    .nullable(),
  
  neighborhood: 
    z.string()
    .max(64, { message: 'O bairro pode conter, no máximo, 64 caracteres' }),
  
  city: 
    z.string()
    .max(64, { message: 'O nome da cidade pode conter, no máximo, 64 caracteres' }),
  
  state: 
    z.string()
    .length(2, { message: 'UF deve ter, exatamente, 2 caracteres' }),
})

export default Address