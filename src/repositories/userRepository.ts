// src/repositories/bookRepository.ts
import pool from '../../db';
import { Payload, User2 } from '../types/customer';


const registerUser = async (payload: Payload) => {
  return await pool.query<User2>('INSERT INTO customers (name, email, points, password) VALUES ($1, $2, $3, $4) returning *', [payload.name, payload.email, 100, payload.hashedPassword])
}

const findOne = async (email: string) => {
  return await pool.query<Express.User>('SELECT * FROM customers WHERE email = $1 LIMIT 1', [email])
}

const findById = async (id: number) => {
  return await pool.query<Express.User>('SELECT * FROM customers WHERE id = $1 LIMIT 1', [id])
}
export { registerUser, findOne, findById };