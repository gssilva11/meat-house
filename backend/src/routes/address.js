import { Router } from 'express';
import controller from '../controllers/address.js';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/user/:id', controller.retrieveAllByUser); // Buscar todos os endereços por usuário
router.get('/:id', controller.retrieveOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
