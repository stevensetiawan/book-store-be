// src/repositories/bookRepository.ts
import pool from '../../db';
import { Payload, User2 } from '../types/customer';


const registerUser = async (payload: Payload): Promise<User2 | null> => {
  try {
    const result = await pool.query<User2>('INSERT INTO customers (name, email, points, password) VALUES ($1, $2, $3, $4) returning *', [payload.name, payload.email, 100, payload.hashedPassword]);
    return result[0] || null; // Return the first user object or null if result is empty
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

const findOne = async (email: string): Promise<Express.User | null> => {
  try {
    const result = await pool.query<Express.User>('SELECT * FROM customers WHERE email = $1 LIMIT 1', [email]);
    return result[0] || null; // Return the first user object or null if result is empty
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

const findById = async (id: number): Promise<Express.User | null> => {
  try {
    const result = await pool.query<Express.User>('SELECT * FROM customers WHERE id = $1 LIMIT 1', [id]);
    return result[0] || null; // Return the first user object or null if result is empty
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
}

export { registerUser, findOne, findById };