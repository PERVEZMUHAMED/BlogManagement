import { Model } from "mongoose";
import Comment from "../../model/Interface/comment.model.interface";

export default interface ICommentService {
    createComment: (commentData: Comment, model: Model<Comment>) => Promise<Comment>;
    getCommentById: (CommentId: string, model: Model<Comment>) => Promise<Comment>
    updateCommentById: (CommentId: string, CommentData: Record<string, unknown>, model: Model<Comment>) => Promise<Comment>
    deleteCommentById: (CommentId: string, model: Model<Comment>) => Promise<Comment>
    getAllComments: (model: Model<Comment>) => Promise<Array<Comment>>
}