import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';

// Define max and min birth dates for age validation
const maxBirthDate = new Date();
maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18); // 18 years ago

const minBirthDate = new Date();
minBirthDate.setFullYear(maxBirthDate.getFullYear() - 120); // 120 years ago

const Customer = z.object({
  name: z.string()
    .min(5, { message: 'O nome deve ter, no mínimo, 5 caracteres' })
    .regex(/^\S+ \S+$/, { message: 'O nome deve ter um espaço separando nome e sobrenome' }),
  
  ident_document: z.string()
    .trim()
    .length(14, { message: 'O CPF está incompleto' })
    .refine(val => cpf.isValid(val), { message: 'CPF inválido' }),
  
  birth_date: z.date()
    .min(minBirthDate, { message: 'Data de nascimento está muito no passado' })
    .max(maxBirthDate, { message: 'O cliente deve ser maior de 18 anos' })
    .nullable(), 
  
  phone: z.string()
    .transform(v => v.replace('_', '')) // Remove underscores
    .refine(v => v.length === 15, { message: 'O número do telefone/celular está incompleto' }),
  
  email: z.string()
    .email({ message: 'E-mail inválido' }),
  
  senha: z.string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
});

export default Customer;
