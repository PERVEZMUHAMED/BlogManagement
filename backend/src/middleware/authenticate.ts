import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { verify } from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import IAuthMiddleware from "./Interface/authenticate.interface";

// export default interface 
// declare module "jsonwebtoken" {
//     export interface JwtPayload {
//         role: string;
//     }
// }

@injectable()
export default class AuthMiddleware implements IAuthMiddleware {

    public authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token: string = (req as any).cookies.access_token;
        if (!token) return next(new ErrorHandler("Login first and then handle this Resource", "401"));
        verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return next(new ErrorHandler("token or user is Invalid", 401));
            (req as any).user = payload;
            // console.log(payload);
            console.log('req.userA', (req as any).user);
            // console.log('req.userB', (req as any).user.role);
            next();
        });
    }
    public authorizedRoles = (...roles: Array<string>) => {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes((req as any).user.role)) {
                return next(new ErrorHandler(`Role ${(req as any).user.role} is not allowed `, 401));
            }
            next();
        }
    }
}