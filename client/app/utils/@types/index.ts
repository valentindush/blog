export interface Post{
    id: number
    author: User,
    title: string,
    content: string
    create_at?: Date,
    updated_at?: Date
    comments?: Comment[]
}

export interface User{
    id: number
    username: string
    email: string
}

export interface Comment{
    id: number|string
    author: User,
    content: string
    created_at: Date
    updated_at: Date
}