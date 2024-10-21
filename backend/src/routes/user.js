// routes/user.js

import { Router } from "express";
import userController from "../controllers/user.js";

const router = Router();

// Rota para criar um novo usuário (Cadastro)
router.post('/', userController.create);

// Rota para autenticar um usuário (Login)
router.post('/login', userController.login);

// Rota para recuperar todos os usuários (Requer autenticação)
router.get('/', userController.retrieveAll);

// Rota para recuperar um usuário específico por ID (Requer autenticação)
router.get('/:id', userController.retrieveOne);

// Rota para atualizar um usuário específico por ID (Requer autenticação)
router.put('/:id', userController.update);

// Rota para deletar um usuário específico por ID (Requer autenticação)
router.delete('/:id', userController.delete);

export default router;
