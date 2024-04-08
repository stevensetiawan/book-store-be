import express from 'express';
import { createOrder } from '../controllers/orderController';
import { jwtStrategy } from '../middlewares/passport';

const router = express.Router();

router.use(jwtStrategy)

router.post('/', createOrder);

export default router;