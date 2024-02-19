import { Router } from "express"
import { auth, user } from "../di/container.di";

export default class UserRouter {
    private router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoute();
    }
    private initializeRoute() {
        this.router.post("/register", user.createUser);
        this.router.post("/login", user.Login);
        this.router.get("/logout", user.Logout);

        this.router.put("/password/change", auth.authenticateUser, user.changePassword);
        this.router.get("/myprofile", auth.authenticateUser, user.getUserProfile);
        this.router.put("/update", auth.authenticateUser, user.updateUserProfile);
        this.router.delete("/delete", auth.authenticateUser, user.deleteUserProfile);

        this.router.get("/admin/users", auth.authenticateUser, user.getAllUsers);
        this.router.route("/admin/user/:id")
            .get(auth.authenticateUser, auth.authorizedRoles("admin"), user.getUser)
            .put(auth.authenticateUser, auth.authorizedRoles("admin"), user.updateUser)
            .delete(auth.authenticateUser, auth.authorizedRoles("admin"), user.deleteUser);
    }
    public getRouter = (): Router => {
        return this.router;
    }
}