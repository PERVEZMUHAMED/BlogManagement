import { Request, Response, NextFunction } from "express";

export default interface IAuthMiddleware {
    authenticateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>
    authorizedRoles: (...roles: Array<string>) => any
}