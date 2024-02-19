import { Router } from "express";
import { auth, } from "../di/container.di";

export default class CommentRouter {
    private router: Router;
    constructor() {
        this.router = Router();
        this.intializeRoute();
    }
    private intializeRoute() {
    }
    public getRouter(): Router {
        return this.router;
    }
}