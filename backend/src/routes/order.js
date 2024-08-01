import { Router } from 'express';
import controller from '../controllers/order.js';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/user-orders', controller.retrieveByUserIdAndStatus);
router.get('/:id', controller.retrieveOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
