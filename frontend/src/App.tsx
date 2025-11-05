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
        <div>
            <h1 className={"font-bold text-2xl mb-6"}>Book Management</h1>
            <div className="container bg-gray-100 p-4 rounded-lg shadow-md">
                <form onSubmit={handleSave} className="book-form">
                    <h3 className="font-bold text-xl">{editingId ? 'Edit Book' : 'Add New Book'}</h3>
                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                        <div>
                            <label htmlFor="title"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                name</label>
                            <input type="text"
                                   id="title"
                                   placeholder="Title"
                                   value={currentBook.title}
                                   onChange={e => setCurrentBook({...currentBook, title: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="author"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                                name</label>
                            <input type="text"
                                   id="author"
                                   placeholder="Author"
                                   value={currentBook.author}
                                   onChange={e => setCurrentBook({...currentBook, author: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="year"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                            <input type="number"
                                   id="year"
                                   placeholder="Year"
                                   value={currentBook.year}
                                   onChange={e => setCurrentBook({...currentBook, year: Number(e.target.value)})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button
                            className="shadow-md focus:outline-none text-white bg-green-700 hover:cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            type="submit">Save
                        </button>
                        {editingId && <button
                            className="shadow-md text-white bg-blue-700 hover:cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="button" onClick={handleCancelEdit}>Cancel</button>}
                    </div>
                </form>
            </div>
            <div className="book-list">
                <h2 className="font-bold text-xl my-6">Book List</h2>
                {books.length > 0 ? (
                    <ul  className="container bg-gray-100 p-4 rounded-lg shadow-md">
                        {books.map(book => (
                            <li key={book.id} className="flex justify-between items-center">
                                <span><strong>{book.title}</strong> by {book.author} ({book.year})</span>
                                <div className="book-buttons">
                                    <button
                                        className="shadow-md focus:outline-none text-white bg-yellow-400 hover:cursor-pointer hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                        onClick={() => handleEditClick(book)}>Edit
                                    </button>
                                    <button
                                        className="shadow-md focus:outline-none text-white bg-red-700 hover:cursor-pointer hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"

                                        onClick={() => handleDelete(book.id)}>Delete
                                    </button>
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