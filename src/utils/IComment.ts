import { Document } from "mongoose"

export interface IComment extends Document {
    idPost: string,
    creationDate: Date,
    comment: string,
    author: {
        name: string,
        userId: string,
        role: string
    },
    state: boolean
}