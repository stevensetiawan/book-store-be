// src/repositories/bookRepository.ts
import db from '../../db';
import { Order, OrderBook, OrderPayload, Orders } from '../types/order';

const getOrders = async (): Promise<Orders[]> => {
  try {
    const orders: Orders[] = await db.query<Orders>('SELECT * FROM orders');
    return orders;
  } catch (error) {
    console.error('Error in getOrders:', error);
    throw error;
  }
};

const createOrders = async (payload: OrderPayload): Promise<Orders> => {
  try {
    console.log(payload, 'ini yo payload');
    const result = await db.query<Orders>('INSERT INTO orders (customer_id, quantity, total_points) VALUES ($1, $2, $3) returning *', [payload.customer_id, payload.total_quantity, payload.total_points]);
    return result[0]; // Assuming db.query returns an array of OrderBook objects
  } catch (error) {
    console.error('Error in createOrders:', error);
    throw error;
  }
};

const createOrderBooks = async (payload: OrderBook): Promise<OrderBook> => {
  try {
    console.log(payload, 'ya 2 x');
    const result = await db.query<OrderBook>('INSERT INTO orders_books (order_id, book_id, quantity, point) VALUES ($1, $2, $3, $4) RETURNING *', [payload.id, payload.book_id, payload.quantity, payload.point]);
    console.log(result, 'ini result')
    return result[0]; // Assuming db.query returns an object with a single OrderBook entry
  } catch (error) {
    console.log('masuk sini kmn?')
    console.error('Error in createOrderBooks:', error);
    throw error;
  }
};

export default { getOrders, createOrders, createOrderBooks };
