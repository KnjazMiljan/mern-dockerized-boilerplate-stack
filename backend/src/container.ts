import { BookRepositoryMongo } from './infrastructure/repositories/book.repository.mongo.js';
import { BookService } from './application/book.service.js';
import { BookController } from './interface/http/book.controller.js';

const bookRepository = new BookRepositoryMongo();
const bookService = new BookService(bookRepository);
export const bookController = new BookController(bookService);