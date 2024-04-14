// src/services/bookService.ts
import { Order, OrderBook, OrderPayload, OrderPayloadCancel } from '../types/order';
import OrderRepository from '../repositories/orderRepository';
import {registerUser, findById, findById2} from '../repositories/userRepository';
import pool from '../../db';

const getOrders = async (user: number) => {
  try {
    return await OrderRepository.getOrders(user);
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error in getOrders:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const createOrder = async (payload: OrderPayload) => {
  const client = await pool.connect();
  try {
    await pool.query('BEGIN');

    const user = await findById2(payload.customer_id!);
    if(user?.points! >= payload.total_points){
      const order = await OrderRepository.createOrders(payload);
      const orderBooksPromises = (payload.books || []).map((element) => {
        return {
          id: order.id,
          book_id: element.book_id,
          quantity: element.quantity,
          point: element.point
        };
      });;

      // Array to hold any errors occurred during the creation of order books
      const errors = [];

      // Iterate over each order book promise
      for (const element of orderBooksPromises) {
        try {
          await OrderRepository.createOrderBooks(element);
        } catch (error) {
          // Log the error
          console.error('Error creating order book:', error);
          // Add the error to the errors array
          errors.push(error);
        }
      }

      // If there are errors, rollback the transaction and throw an error
      if (errors.length > 0) {
        await pool.query('ROLLBACK');
        throw new Error(JSON.stringify({message: 'Failed to create some order books'}))
      } else {
        await OrderRepository.updateOrderCustomer(payload);
        await pool.query('COMMIT');
      }

      
        return { success: true, message: 'Order created successfully', data: orderBooksPromises };
    } else {
      await pool.query('ROLLBACK');
      throw new Error(JSON.stringify("Not enough points!"))
    }
    
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error in createOrder:', error);
    
    await pool.query('ROLLBACK');
    throw error; // Re-throw the error to be handled by the caller
  } finally {
    // Close the database connection
    if(client){
      await client.release();
    }
  }
};

const cancelOrder = async (payload: OrderPayloadCancel) => {
  const client = await pool.connect();
  try {
    await pool.query('BEGIN');

    const order = await OrderRepository.cancelOrder(payload);

    if(order){
      await OrderRepository.cancelOrderCustomer(payload)

      await pool.query('COMMIT');
    
      return { success: true, message: 'Order canceled successfully', data: order };
    }
    
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error in createOrder:', error);
    
    await pool.query('ROLLBACK');
    throw error; // Re-throw the error to be handled by the caller
  } finally {
    // Close the database connection
    if(client){
      await client.release();
    }
  }
};

export default { getOrders, createOrder, cancelOrder };
