export interface TheTableOfReferenceBooksProps {
    count: number;
    tableRows: {
        name: string;
        className: string;
    }[];
    articles: {
        id: string;
        name: string;
    }[];
    onDelete(id: string): void
    isPending: boolean;
};