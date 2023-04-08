import { PostDatabase } from "../database/PostDatabase"
import { PostDTO } from "../dtos/PostDTO"
import { Post } from "../models/Post"
import { PostDB } from "../types"

export class PostBusiness {

    constructor(
        private postDTO: PostDTO,
        private postDatabase: PostDatabase
    ) { }

    public getPost = async (input: any) => {

        const { q } = input

        const postsDB = await this.postDatabase.findPost(q)

        const posts: Post[] = postsDB.map((postDB) => new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.created_at
        ))

        return ({ posts: posts })
    }

    public createPost = async (input: any) => {
        const { id, creator_id, content } = input

        if (typeof id !== "string") {
            throw new Error("ID deve ser uma string.")
        }

        if (typeof creator_id !== "string") {
            throw new Error("CREATOR ID deve ser uma string.")
        }

        const postDBExists = await this.postDatabase.findPostById(id)

        if (postDBExists) {
            throw new Error("ID já existente.")
        }

        const newPost = new Post(
            id,
            creator_id,
            content,
            new Date().toISOString()
        )

        const newPostDB: PostDB = {
            id: newPost.getId(),
            creator_id: newPost.getCreatorId(),
            content: newPost.getContent(),
            created_at: newPost.getCreatedAt()
        }

        await this.postDatabase.insertPost(newPostDB)

        const output = this.postDTO.createPostOutput(newPost)

        return (output)
    }

    public editPost = async (input:any)=>{
        const {
            idToEdit,
            newId,
            newCreatorId,
            newContent,
            newCreatedAt
        }= input

        const postToEditDB = await this.postDatabase.findPostById(idToEdit)

        if(!postToEditDB){
            throw new Error("ID inexistente.")
        }

        const post = new Post(
            postToEditDB.id,
            postToEditDB.creator_id,
            postToEditDB.content,
            postToEditDB.created_at
        )

        newId && post.setId(newId)
        newCreatorId && post.setcreatorId(newCreatorId)
        newContent && post.setContent(newContent)
        newCreatedAt && post.setCreatedAt(newCreatedAt)

        const updatedPostDB: PostDB = {
            id: post.getId(),
            creator_id: post.getCreatorId(),
            content: post.getContent(),
            created_at: post.getCreatedAt()
        }

        await this.postDatabase.updatePost(updatedPostDB)

        const output = this.postDTO.editPostOutput(post)

        return output
    }

    public deletePost = async (input: any) => {
        const { idToDelete } = input

        const postToDeleteDB = await this.postDatabase.findPostById(idToDelete)

        if (!postToDeleteDB) {
            throw new Error("ID inexistente.")
        }

        await this.postDatabase.deletePostById(postToDeleteDB.id)

        const output = {
            message: "Deletado com sucesso."
        }

        return output
    }

}