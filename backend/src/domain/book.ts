export interface BookProps {
    id?: string;
    title: string;
    author: string;
    year: number;
}

export class Book {
    public readonly id?: string;
    public title: string;
    public author: string;
    public year: number;

    constructor(props: BookProps) {
        this.id = props.id;
        this.title = props.title.trim();
        this.author = props.author.trim();
        this.year = props.year;

        if (!this.title) throw new Error('Title required');
        if (!this.author) throw new Error('Author required');
    }
}