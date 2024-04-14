// src/repositories/bookRepository.ts
import db from '../../db';
import { Book, params } from '../types/book';

const getBooks = async (payload: params): Promise<Book[]> => {
  return await db.query<Book>('SELECT * FROM books ORDER BY id DESC LIMIT $1 OFFSET $2;', [payload.showentry, payload.offset]);
};

export default { getBooks };
