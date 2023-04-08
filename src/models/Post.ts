export class Post {
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public setcreatorId(value: string): void {
        this.creatorId = value
    }
    
    public getContent(): string {
        return this.content 
    }
    
    public setContent(value: string): void {
        this.content = value
    }
    
    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }
}