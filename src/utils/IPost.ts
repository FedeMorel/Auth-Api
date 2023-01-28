import { Document } from "mongoose"

export interface IPost extends Document {
    title: string,
    description: string,
    creationDate: Date,
    modificationDate: Date,
    author: {
        name: string,
        userId: string,
        role: string
    },
    state: boolean
}