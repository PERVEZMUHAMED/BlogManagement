import { Schema, model, Types } from "mongoose";
import Post from "./Interface/post.model.interface";

let objectId = Types.ObjectId;

const postSchema = new Schema({
    user_id: {
        type: objectId,
        required: true
    },
    title: {
        type: String,
        required: [true, "Please, enter Title"],
    },
    content: {
        type: String,
        required: [true, "Please enter the content"]

    },
    author: {
        type: String,
        required: [true, "Please Enter author Name"]
    },
    date: {
        type: Date,
        default: Date.now,
    },
    tags: {
        type: [String],
        default: []
    },
    comments: [{
        type: objectId,
        ref: "comments"
    }]
}, { timestamps: true });

export default model<Post>("posts", postSchema);