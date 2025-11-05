const API_URL = 'http://localhost:5000/api/books';

export interface Book {
    id: string;
    title: string;
    author: string;
    year: number;
}

export type BookInput = Omit<Book, 'id'>;

export const getBooks = async (): Promise<Book[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    return response.json();
};

export const createBook = async (book: BookInput): Promise<Book> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        throw new Error('Failed to create book');
    }
    return response.json();
};

export const updateBook = async (id: string, book: BookInput): Promise<Book> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        throw new Error('Failed to update book');
    }
    return response.json();
};

export const deleteBook = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete book');
    }
};