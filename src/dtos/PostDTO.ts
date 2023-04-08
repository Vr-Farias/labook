import { Post } from "../models/Post"

export interface CreatePostInputDTO {
    id: string,
    creator_id: string,
    content: string
}

export interface CreatePostOutputDTO {
    message: string,
    post: {
        id: string,
        creator_id: string,
        content: string
    }
}

export interface EditPostInputDTO {
    idToEdit: string,
    newId: string | undefined,
    newCreatorId: string | undefined,
    newContent: string | undefined,
    newCreatedAt: string | undefined
}

export interface EditPostOutputDTO {
    message: string,
    post: {
        id: string,
        creatorId: string,
        content: string,
        createdAt: string
    }
}

export class PostDTO {
    public createPostInput(
        id: unknown,
        creator_id: unknown,
        content: unknown
    ) {
        if (typeof id !== "string") {
            throw new Error("ID deve ser uma string.")
        }

        if (typeof creator_id !== "string") {
            throw new Error("CREATOR ID deve ser uma string.")
        }

        if (typeof content !== "string") {
            throw new Error("CONTENT deve ser uma string.")
        }

        const dto: CreatePostInputDTO = {
            id,
            creator_id,
            content
        }

        return dto
    }

    public createPostOutput(post: Post) {
        const dto: CreatePostOutputDTO = {
            message: "Sucesso!",
            post: {
                id: post.getId(),
                creator_id: post.getCreatorId(),
                content: post.getContent()
            }
        }
    }

    public editPostInput(
        idToEdit: unknown,
        newId: unknown,
        newCreatorId: unknown,
        newContent: unknown,
        newCreatedAt: unknown

    ){
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                throw new Error("ID deve ser uma string.")
            }
        }

        if (newCreatorId !== undefined) {
            if (typeof newCreatorId !== "string") {
                throw new Error("CREATOR ID deve ser uma string.")
            }
        }

        if (newContent !== undefined) {
            if (typeof newContent !== "string") {
                throw new Error("CONTENT deve ser uma string.")
            }
        }

        if (newCreatedAt !== undefined) {
            if (typeof newCreatedAt !== "string") {
                throw new Error("CREATEDAT deve ser uma string.")
            }
        }

        const dto = {
            idToEdit,
            newId,
            newCreatorId,
            newContent,
            newCreatedAt
        }
        return dto
    }

    public editPostOutput (post:Post): EditPostOutputDTO{
        const dto: EditPostOutputDTO = {
            message: "Editado com sucesso.",
            post:{
                id: post.getId(),
                creatorId: post.getCreatorId(),
                content: post.getContent(),
                createdAt: post.getCreatedAt()
            }
        }
        return dto
    }
}