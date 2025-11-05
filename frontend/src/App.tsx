import { useState, useEffect, type FormEvent } from 'react';
import * as api from './api';
import type {Book, BookInput} from './api';
import './App.css';

function App() {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentBook, setCurrentBook] = useState<Partial<BookInput>>({ title: '', author: '', year: new Date().getFullYear() });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        api.getBooks().then(setBooks).catch(err => console.error(err));
    }, []);

    const handleEditClick = (book: Book) => {
        setEditingId(book.id);
        setCurrentBook({ title: book.title, author: book.author, year: book.year });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setCurrentBook({ title: '', author: '', year: new Date().getFullYear() });
    };

    const handleDelete = async (id: string) => {
        try {
            await api.deleteBook(id);
            setBooks(books.filter(b => b.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        const bookData: BookInput = {
            title: currentBook.title || '',
            author: currentBook.author || '',
            year: Number(currentBook.year) || new Date().getFullYear(),
        };

        try {
            if (editingId) {
                const updatedBook = await api.updateBook(editingId, bookData);
                setBooks(books.map(b => b.id === editingId ? updatedBook : b));
            } else {
                const newBook = await api.createBook(bookData);
                setBooks([...books, newBook]);
            }
            handleCancelEdit();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h1>Book Management</h1>
            <div>
                <form onSubmit={handleSave} className="book-form">
                    <h3>{editingId ? 'Edit Book' : 'Add New Book'}</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={currentBook.title}
                        onChange={e => setCurrentBook({ ...currentBook, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={currentBook.author}
                        onChange={e => setCurrentBook({ ...currentBook, author: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={currentBook.year}
                        onChange={e => setCurrentBook({ ...currentBook, year: Number(e.target.value) })}
                        required
                    />
                    <div className="form-buttons">
                        <button type="submit">Save</button>
                        {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
                    </div>
                </form>
            </div>
            <div className="book-list">
                <h2>Book List</h2>
                {books.length > 0 ? (
                    <ul>
                        {books.map(book => (
                            <li key={book.id}>
                                <span><strong>{book.title}</strong> by {book.author} ({book.year})</span>
                                <div className="book-buttons">
                                    <button onClick={() => handleEditClick(book)}>Edit</button>
                                    <button onClick={() => handleDelete(book.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books found. Add one above!</p>
                )}
            </div>
        </div>
    );
}

export default App;