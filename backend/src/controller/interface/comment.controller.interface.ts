import { Request, Response, NextFunction } from "express";


export default interface ICommentController {
    createComment: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getComment: (req: Request, res: Response, next: NextFunction) => Promise<void>
    editComment: (req: Request, res: Response, next: NextFunction) => Promise<void>
    deleteComment: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getAllComments: (req: Request, res: Response, next: NextFunction) => Promise<void>
}