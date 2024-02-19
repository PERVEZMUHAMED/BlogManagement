import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/TYPES";
import Comment from "../model/Interface/comment.model.interface";
import commentModel from "../model/comment.model";
import ICommentService from "../service/Interface/comment.service.interface";
import ICommentController from "./Interface/comment.controller.interface";
import ErrorHandler from "../utils/errorHandler";

@injectable()
export default class CommentController implements ICommentController {
    private readonly CommentService: ICommentService;
    constructor(
        @inject(TYPES.CommentService) private _CommentService: ICommentService
    ) {
        this.CommentService = _CommentService;
    }

    public createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const commentData: Comment = req.body;
        try {
            const createcomment = await this.CommentService.createComment({
                user_id: (req as any).user.id,
                post_id: req.params.id,
                ...commentData,
            }, commentModel);
            if (!createcomment) return next(new ErrorHandler("Comment not Created", 400));
            res.status(201).json({
                success: true,
                message: "Comment is successfully Created.",
                data: createcomment
            });
        } catch (error) {
            next(error);
        }
    }

    public getComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const getcomment = await this.CommentService.getCommentById((req as any).user._id, commentModel);
            if (!getcomment) return next(new ErrorHandler("Comment not Found", 400));
            res.status(200).json({
                success: true,
                getcomment
            })
        } catch (error) {
            next(error);
        }
    }

    public editComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const editcomment = await this.CommentService.updateCommentById((req as any).user.id, req.body, commentModel);
            if (!editcomment) return next(new ErrorHandler("comment not found", 400));
            res.status(200).json({
                success: true,
                message: "Comment edited Successfully"
            })
        } catch (error) {
            next(error);
        }
    }

    public deleteComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deletecomment = await this.CommentService.deleteCommentById(req.params.id, commentModel);
            if (!deletecomment) return next(new ErrorHandler("Comment not Deleted", 401));
            res.status(200).json({
                success: true,
                message: "Comment Deleted Successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    public getAllComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const getallposts = await this.CommentService.getAllComments(commentModel);
            if (!getallposts) return next(new ErrorHandler("Posts are not found", 401));
            res.status(200).json({
                success: true,
                posts: getallposts.length,
                getallposts
            });
        } catch (error) {
            next(error);
        }
    }
}