// src/services/bookService.ts
import BookRepository from '../repositories/bookRepository';

const getBooks = async () => {
  return await BookRepository.getBooks();
};

export default { getBooks };
