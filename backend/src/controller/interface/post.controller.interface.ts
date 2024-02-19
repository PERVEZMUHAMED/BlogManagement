import { Request, Response, NextFunction } from "express";


export default interface IPostController {
    createPost: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getPost: (req: Request, res: Response, next: NextFunction) => Promise<void>
    updatePost: (req: Request, res: Response, next: NextFunction) => Promise<void>
    deletePost: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getAllPosts: (req: Request, res: Response, next: NextFunction) => Promise<void>

}