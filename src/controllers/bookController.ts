// src/controllers/bookController.ts
import { Request, Response } from 'express';
import BookService from '../services/bookService';

const getBooks = async (req: Request, res: Response) => {
  try {
    const page:number = parseInt(req.query.page as string) 

    const books = await BookService.getBooks(page);
    return res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { getBooks };
