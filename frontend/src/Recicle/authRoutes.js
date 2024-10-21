import { Router } from 'express';
import { login, signup, protectedRoute } from './authController.js';

const router = Router();

// Rota para login
router.post('/login', login);

// Rota para cadastro
router.post('/signup', signup);  // Adiciona a rota de cadastro

// Rota de exemplo protegida
router.get('/protected', protectedRoute);

export default router;
