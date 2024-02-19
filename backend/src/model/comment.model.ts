import { Schema, model, Types } from "mongoose"
import Comment from "./Interface/comment.model.interface";

let objectId = Types.ObjectId;

const commentSchema = new Schema({
    user_id: {
        type: objectId,
        ref: "users",
        required: true
    },
    post_id: {
        type: objectId,
        ref: "posts",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export default model<Comment>("comments", commentSchema);