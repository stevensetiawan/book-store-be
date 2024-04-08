// src/controllers/bookController.ts
import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../repositories/userRepository';
import { Info, Payload } from '../types/customer';
import { hashPassword } from '../libraries/bcrypt';
import {localStrategy} from '../middlewares/passport';
import jwt from 'jsonwebtoken';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body ;

    const hashedPassword = await hashPassword(password, 10);
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


export async function loginUser(req: Request, res: Response, next?: NextFunction) {
  localStrategy(req, res, (err: Error, user: Express.User, info?: Info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info?.message,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // Generate JWT token
            const payload = {
              id: user.id,
              email: user.email,
              name : user.name
            }

            const token = jwt.sign(payload, 'your-secret'); // Replace with your secret key
            return res.json(token);
        });
    })(req, res, next);
}
