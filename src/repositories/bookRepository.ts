// src/repositories/bookRepository.ts
import db from '../../db';
import { Book } from '../types/book';

const getBooks = async (): Promise<Book[]> => {
  return await db.query<Book>('SELECT * FROM books');
};

export default { getBooks };
