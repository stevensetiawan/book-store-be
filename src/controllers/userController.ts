// src/controllers/bookController.ts
import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../repositories/userRepository';
import { Payload } from '../types/customer';
import { hashPassword } from '../libraries/bcrypt';
import userService from '../services/userService';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body ;

    const hashedPassword = await hashPassword(password);
    const payload: Payload = {
      name,
      email,
      hashedPassword,
    }
    const user = await registerUser(payload)
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching books:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// controllers/authController.ts

export async function getUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id || '');

      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      const user = await userService.getUser(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching books:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};
