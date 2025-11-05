import { Book } from '../domain/book.js';
import { BookRepository } from './ports/book.repository.js';

export class BookService {
    constructor(private repository: BookRepository) {}

    getAll() {
        return this.repository.findAll();
    }
    getById(id: string) {
        return this.repository.findById(id);
    }
    create(data: Omit<Book, 'id'>) {
        return this.repository.create(new Book(data));
    }
    update(id: string, data: Omit<Book, 'id'>) {
        return this.repository.update(id, new Book({ ...data, id }));
    }
    delete(id: string) {
        return this.repository.delete(id);
    }
}