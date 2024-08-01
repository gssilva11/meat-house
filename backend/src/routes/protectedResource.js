import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/protected-resource', verifyToken, (req, res) => {
  res.status(200).send({ message: 'This is a protected resource', user: req.user });
});

export default router;
