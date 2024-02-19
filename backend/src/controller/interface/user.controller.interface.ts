import { Request, Response, NextFunction } from "express";

export default interface IUserController {
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>
    Login: (req: Request, res: Response, next: NextFunction) => Promise<void>
    Logout: (req: Request, res: Response, next: NextFunction) => void
    changePassword: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getUserProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>
    updateUserProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>
    deleteUserProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getUser: (req: Request, res: Response, next: NextFunction) => Promise<void>
    updateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>
    deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>
} 