const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the MERN backend!' });
});

mongoose.connect(DB_URL)
    .then(() => {
        console.log('MongoDB connected successfully.');
        // Start the server *after* the DB connection is successful
        app.listen(PORT, () => {
            console.log(`Backend server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });