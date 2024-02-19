import { Router } from "express";
import { auth, post, user } from "../di/container.di";

export default class PostRouter {
    private router: Router;
    constructor() {
        this.router = Router();
        this.intializeRoute();
    }
    private intializeRoute() {
        this.router.route("/post/create").post(auth.authenticateUser, post.createPost);
    }
    public getRouter(): Router {
        return this.router;
    }
}