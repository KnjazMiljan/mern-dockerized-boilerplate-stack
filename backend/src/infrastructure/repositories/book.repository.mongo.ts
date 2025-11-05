import { Book } from '../../domain/book.js';
import { BookModel } from '../db/book.model.js';
import { BookRepository } from '../../application/ports/book.repository.js';

export class BookRepositoryMongo implements BookRepository {
    async findAll() {
        const docs = await BookModel.find();
        return docs.map(this.toDomain);
    }
    async findById(id: string) {
        const doc = await BookModel.findById(id);
        return doc ? this.toDomain(doc) : null;
    }
    async create(book: Book) {
        const doc = await BookModel.create(book);
        return this.toDomain(doc);
    }
    async update(id: string, book: Book) {
        const doc = await BookModel.findByIdAndUpdate(id, book, { new: true });
        return doc ? this.toDomain(doc) : null;
    }
    async delete(id: string) {
        const res = await BookModel.findByIdAndDelete(id);
        return Boolean(res);
    }

    private toDomain(doc: any): Book {
        const obj = doc.toObject();
        return new Book({ id: obj._id.toString(), title: obj.title, author: obj.author, year: obj.year });
    }
}