export interface Blog{
    author: string,
    title: string,
    content: string
    createAt?: Date,
    updatedAt?: Date
}

export interface Comment{
    id: number|string
    author: string,
    content: string
    createdAt: Date
    updatedAt?: Date
}