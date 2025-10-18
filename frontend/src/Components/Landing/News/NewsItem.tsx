export interface NewsItem {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    author: string;
    date?: number[]; // корректируем тип здесь как number[]
}