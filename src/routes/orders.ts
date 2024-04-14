import express from 'express';
import { createOrder, getOrders, cancelOrder } from '../controllers/orderController';
import { jwtStrategy } from '../middlewares/passport';

const router = express.Router();

router.use(jwtStrategy)

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', cancelOrder);

export default router;