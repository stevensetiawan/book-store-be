// src/services/bookService.ts
import BookRepository from '../repositories/bookRepository';

const getBooks = async (page: number) => {
  const showentry = 8
  let offset = 0
  if(page > 1 ){
    offset = (page * showentry) - showentry;
  }
  const payload = {
    showentry,
    offset
  }
  return await BookRepository.getBooks(payload);
};

export default { getBooks };
