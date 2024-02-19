import { inject, injectable } from "inversify";
import { TYPES } from "../di/TYPES";
import ICommentRepository from "../repository/Interface/comment.repository.interface";
import ICommentService from "./Interface/comment.service.interface";
import Comment from "../model/Interface/comment.model.interface";
import { Model } from "mongoose";

@injectable()
export default class CommentService implements ICommentService {
    private readonly CommentRepo: ICommentRepository;
    constructor(
        @inject(TYPES.CommentRepository) private _CommentRepo: ICommentRepository
    ) {
        this.CommentRepo = _CommentRepo;
    }
    public createComment = async (CommentData: Comment, model: Model<Comment>): Promise<Comment> => {
        try {
            const Comment = await this.CommentRepo.Create(CommentData, model);
            return Comment;
        } catch (error) {
            return error;
        }
    }
    public getCommentById = async (CommentData, model) => {
        try {
            const getComment = await this.CommentRepo.FindById(CommentData, model);
            return getComment;
        } catch (error) {
            return error;
        }
    }
    public updateCommentById = async (CommentData, CommentId, model) => {
        try {
            const updateComment = await this.CommentRepo.FindByIdAndUpdate(CommentId, CommentData, model);
            return updateComment;
        } catch (error) {
            return error;
        }
    }
    public deleteCommentById = async (CommentId: string, model: Model<Comment>): Promise<Comment> => {
        try {
            const deleteComment = await this.CommentRepo.FindByIdAndDelete(CommentId, model);
            return deleteComment;
        } catch (error) {
            return error;
        }
    }
    public getAllComments = async (model: Model<Comment>): Promise<Array<Comment>> => {
        try {
            const getComment = await this.CommentRepo.Find(model);
            return getComment;
        } catch (error) {
            return error;
        }
    }
}