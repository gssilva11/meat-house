import { z } from 'zod';

const User = z.object({
  first_name: z.string().min(1, { message: 'O nome é obrigatório' }),
  last_name: z.string().min(1, { message: 'O sobrenome é obrigatório' }),
  email: z.string().email({ message: 'Endereço de email inválido' }),
  phone: z.string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: 'Formato de telefone inválido (Ex: (99) 99999-9999)' }),
  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),

});

export default User;
