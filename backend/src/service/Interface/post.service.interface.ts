import { Model } from "mongoose";
import Post from "../../model/Interface/post.model.interface";

export default interface IPostService {
    postCreate: (postData: Post, model: Model<Post>) => Promise<Post>
    getPostById: (PostId: string, model: Model<Post>) => Promise<Post>
    updatePostById: (PostId: string, PostData: Record<string, unknown>, model: Model<Post>) => Promise<Post>
    deletePostById: (PostId: string, model: Model<Post>) => Promise<Post>
    getAllPosts: (model: Model<Post>) => Promise<Array<Post>>
}