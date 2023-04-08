export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    created_at: string
}