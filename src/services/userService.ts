// src/services/bookService.ts
import {registerUser, findById} from '../repositories/userRepository';
import { User2 } from '../types/customer'

const registerUserService = async (payload: User2) => {
  return await registerUser(payload);
};

const getUser = async (id: number) => {
  try {
    return await findById(id);
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error in getOrders:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default { registerUserService, getUser };
