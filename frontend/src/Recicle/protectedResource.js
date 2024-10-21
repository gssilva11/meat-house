import { Router } from "express";
import { verifyToken } from "./middlewares/authMiddleware.js";

const router = Router();

// Rota para acessar um recurso protegido
router.get('/protected-resource', verifyToken, (req, res) => {
  res.status(200).send({ message: 'Este é um recurso protegido', user: req.user });
});

export default router;
