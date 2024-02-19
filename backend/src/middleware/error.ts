import { NextFunction, Request, Response } from "express";

class ErrorMiddleware {
    public errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message || "Internal Server Error"
        res.status(status).json({
            success: false,
            status: status,
            message: message,
            stack: err.stack
        })
    }
}
export default new ErrorMiddleware();