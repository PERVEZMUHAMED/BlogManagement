import { Document } from "mongoose";

type Comment = {
    user: string
    comment: string
    date: Date
}

export default interface Post extends Document {
    _id: string
    user_id: string
    title: string
    content: string
    author: string
    date: string
    tags: Array<string>
    comments: Array<Comment>
}