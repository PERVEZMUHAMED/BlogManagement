import { inject, injectable } from "inversify";
import IPostController from "./Interface/post.controller.interface";
import IPostService from "../service/Interface/post.service.interface";
import { TYPES } from "../di/TYPES";
import { Request, Response, NextFunction } from "express";
import Post from "../model/Interface/post.model.interface";
import ErrorHandler from "../utils/errorHandler";
import postModel from "../model/post.model";

@injectable()
export default class PostController implements IPostController {
    private readonly postService: IPostService;
    constructor(
        @inject(TYPES.PostService) private _postService: IPostService
    ) {
        this.postService = _postService;
    }
    public createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const postData: Post = req.body;
        const { title, content, author } = postData;
        if (!title || !content || author) {
            return next(new ErrorHandler("Please filled all the  details", 400));
        }
        try {
            const post = await this.postService.postCreate({
                ...req.body,
                user_id: (req as any).user._id,
            }, postModel);
            if (!post) return next(new ErrorHandler("Post not Created", 401));
            res.status(201).json({
                success: true,
                message: "Post is successfully Created.",
                data: post
            })
        } catch (error) {
            next(error);
        }
    }

    public getPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const getpost = await this.postService.getPostById((req as any).user.id, postModel);
            if (!getpost) return next(new ErrorHandler("Post not deleted", 400));
            res.status(200).json({
                success: true,
                getpost
            })
        } catch (error) {
            next(error);
        }
    }
    public updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updatepost = await this.postService.updatePostById((req as any).user.id, req.body, postModel);
            if (!updatepost) return next(new ErrorHandler("Post not updated", 400));
            res.status(200).json({
                success: true,
                message: "Post update successfully",
                updatepost
            });
        } catch (error) {
            next(error);
        }
    }
    public deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deletepost = await this.postService.getPostById((req as any).user.id, postModel);
            if (!deletepost) return next(new ErrorHandler("Post not deleted", 400));
            res.status(200).json({
                success: true,
                message: "post successfully deleted"
            });
        } catch (error) {
            next(error);
        }
    }
    public getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const getallposts = await this.postService.getAllPosts(postModel);
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

// public post = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//     } catch (error) {
//         next(error);
//     }
// }