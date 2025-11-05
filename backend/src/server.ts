import express from 'express';
import cors from 'cors';
import { connectMongo } from './infrastructure/db/mongoose.config.js';
import { createBookRouter } from './interface/http/book.routes.js';
import { bookController } from './container.js';

const PORT = process.env.PORT || 5000;

(async () => {
    await connectMongo(process.env.MONGO_URI || 'mongodb://localhost:27017/clean_db');

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/api/books', createBookRouter(bookController));

    app.get('/health', (req, res) => {
        return res.status(200).json({ message: 'OK' });
    })

    app.listen(PORT, () => console.log(`API listening on :${PORT}`));
})();