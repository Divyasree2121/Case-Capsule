
export interface Summary {
    id: string;
    name: string;
    type: 'Text' | 'Document';
    date: string;
    summary: string;
    wordCount: number;
}
