// src/services/bookService.ts
import {registerUser} from '../repositories/userRepository';
import { User2 } from '../types/customer'

const registerUserService = async (payload: User2) => {
  return await registerUser(payload);
};

export default { registerUserService };
