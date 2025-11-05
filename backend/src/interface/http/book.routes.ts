import { Router } from 'express';
import { BookController } from './book.controller.js';

export const createBookRouter = (ctrl: BookController) => {
    const r = Router();
    r.get('/', ctrl.getAll);
    r.get('/:id', ctrl.getById);
    r.post('/', ctrl.create);
    r.put('/:id', ctrl.update);
    r.delete('/:id', ctrl.delete);
    return r;
};