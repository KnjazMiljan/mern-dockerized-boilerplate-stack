import { Request, Response } from 'express';
import { BookService } from '../../application/book.service.js';

export class BookController {
    constructor(private svc: BookService) {}

    getAll = async (_: Request, res: Response) => res.json(await this.svc.getAll());
    getById = async (req: Request, res: Response) => {
        const book = await this.svc.getById(req.params.id);
        book ? res.json(book) : res.sendStatus(404);
    };
    create = async (req: Request, res: Response) => res.status(201).json(await this.svc.create(req.body));
    update = async (req: Request, res: Response) => {
        const updated = await this.svc.update(req.params.id, req.body);
        updated ? res.json(updated) : res.sendStatus(404);
    };
    delete = async (req: Request, res: Response) => {
        await this.svc.delete(req.params.id);
        res.sendStatus(204);
    };
}