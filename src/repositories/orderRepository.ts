// src/repositories/bookRepository.ts
import { User2 } from 'customer';
import db from '../../db';
import { Order, OrderBook, OrderPayload, OrderPayloadCancel, Orders } from '../types/order';

const getOrders = async (user: number): Promise<Orders[]> => {
  try {
    const orders: Orders[] = await db.query<Orders>('SELECT * FROM orders WHERE customer_id = $1 AND status = $2 ORDER BY id DESC', [user, true]);
    return orders;
  } catch (error) {
    console.error('Error in getOrders:', error);
    throw error;
  }
};

const createOrders = async (payload: OrderPayload): Promise<Orders> => {
  try {
    const result = await db.query<Orders>('INSERT INTO orders (customer_id, quantity, total_points) VALUES ($1, $2, $3) returning *', [payload.customer_id, payload.total_quantity, payload.total_points]);
    if (result && result[0]) {
      return result[0]; // Assuming db.query returns an object with a single OrderBook entry
    } else {
      throw new Error('Failed to create order');
    }
  } catch (error) {
    throw error;
  }
};

const cancelOrder = async (payload: OrderPayloadCancel): Promise<Orders> => {
  try {
    const result = await db.query<Orders>('UPDATE orders SET status = $1 WHERE id = $2 returning *', [false, payload.order_id]);
    if (result && result[0]) {
      return result[0]; // Assuming db.query returns an object with a single OrderBook entry
    } else {
      throw new Error('Failed to create order');
    }
  } catch (error) {
    console.error('Error in createOrders:', error);
    throw error;
  }
};

const updateOrderCustomer = async (payload: OrderPayload): Promise<User2> => {
  try {
    const result = await db.query<User2>('UPDATE customers SET points = points - $2 WHERE id = $1 returning *',[payload.customer_id, payload.total_points]);
    if (result && result[0]) {
      return result[0]; // Assuming db.query returns an object with a single OrderBook entry
    } else {
      throw new Error('Failed to create order');
    }
  } catch (error) {
    console.error('Error in createOrders:', error);
    throw error;
  }
};

const cancelOrderCustomer = async (payload: OrderPayloadCancel): Promise<User2> => {
  try {
    const result = await db.query<User2>('UPDATE customers SET points = points + $2 WHERE id = $1 returning *',[payload.customer_id, payload.total_points]);
    if (result && result[0]) {
      return result[0]; // Assuming db.query returns an object with a single OrderBook entry
    } else {
      throw new Error('Failed to create order');
    }
  } catch (error) {
    console.error('Error in createOrders:', error);
    throw error;
  }
};

const createOrderBooks = async (payload: OrderBook): Promise<OrderBook> => {
  try {
    const result = await db.query<OrderBook>('INSERT INTO orders_books (order_id, book_id, quantity, point) VALUES ($1, $2, $3, $4) RETURNING *', [payload.id, payload.book_id, payload.quantity, payload.point]);
    if (result && result[0]) {
      return result[0]; // Assuming db.query returns an object with a single OrderBook entry
    } else {
      throw new Error('Failed to create order book');
    }  } catch (error) {
    console.error('Error in createOrderBooks:', error);
    throw error;
  }
};

export default { getOrders, createOrders, createOrderBooks, cancelOrder, cancelOrderCustomer, updateOrderCustomer };
