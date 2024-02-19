import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { join } from "path";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middleware/error";
import UserRouter from "./router/user.router";
import { rateLimit } from "express-rate-limit";
import PostRouter from "./router/post.router";
dotenv.config({ path: join(__dirname, "config/config.env") });

export default class App {
    app: Application
    constructor() {
        this.app = express();
        this.config();
        this.mountRoute();
    }
    public config() {
        let limiter = rateLimit({
            limit: 100,
            windowMs: 60 * 60 * 1000,
            message: "we recevied to many request from this IP. Please Try after one hour."
        })
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use('/api/v1', limiter);
    }
    public mountRoute() {
        const UserRoute = new UserRouter();
        const PostRoute = new PostRouter();
        this.app.use("/api/v1/", UserRoute.getRouter());
        this.app.use("/api/v1/", PostRoute.getRouter());
        this.app.use(ErrorMiddleware.errorHandler);
    }
    public startServer = (): void => {
        const { PORT } = process.env;
        this.app.listen(PORT, () => {
            console.log(`server is connected in http://localhost:${PORT}/`);
        })
    }
}