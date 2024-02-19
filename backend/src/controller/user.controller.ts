import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../di/TYPES";
import IUserService from "../service/Interface/user.service.interface";
import IUserController from "./Interface/user.controller.interface";
import ErrorHandler from "../utils/errorHandler";
import userModel from "../model/user.model";
import User from "../model/Interface/user.model.interface";

@injectable()
export default class UserController implements IUserController {
    private readonly userService: IUserService;
    constructor(
        @inject(TYPES.UserService) private _userService: IUserService
    ) {
        this.userService = _userService;
    }

    // Register User - api/v1/register
    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userData: User = req.body;
        const { userName, password, email } = userData;
        if (!userName || !password || !email) {
            return next(new ErrorHandler("Please filled all the fields", 400));
        }
        try {
            const existuser = await this.userService.existUser({ userName: userName }, userModel);
            if (existuser) return next(new ErrorHandler("userName Already Exists.Try with another", 400));
            const existEmail = await this.userService.existEmail({ email: email }, userModel);
            if (existEmail) return next(new ErrorHandler("Email Already Exists.Try with another", 400));
            const user = await this.userService.createUser(req.body, userModel);
            if (!user) next(new ErrorHandler("User not created", 401));
            console.log("createUser", user);
            res.status(200).json({
                success: true,
                message: "User created Successfully",
                data: user
            })
        } catch (error) {
            next(error);
        }
    }
    // Login User - api/v1/login
    public Login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password }: Record<string, string> = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter email and password", 400));
        }
        try {
            const user = await this.userService.existEmail({ email: email }, userModel);
            if (!user) return next(new ErrorHandler("email or password is Invalid", 400));
            const validPw = await this.userService.validPassword(password, user.password);
            if (!validPw) return next(new ErrorHandler("email or password is Invalid", 400));
            const token = this.userService.generateToken(user);
            res.status(200).cookie("access_token", token, {
                expires: new Date(Date.now() +
                    (process.env.COOKIE_EXPIRES_TIME as any) * 24 * 60 * 60 * 1000), httpOnly: true
            }).json({
                success: true,
                message: "Login Successfully",
                user: user,
                token: token,
            })
        } catch (error) {
            next(error);
        }
    }
    // Logout User - api/v1/logout
    public Logout = (req: Request, res: Response, next: NextFunction): void => {
        try {
            res.cookie("access_token", null, { expires: new Date(Date.now()), httpOnly: true })
                .status(200).json({
                    success: true,
                    message: "Logout Successfully"
                });
        } catch (error) {
            next(error);
        }
    }
    // chnage  User Password - api/v1/password/change
    public changePassword = async (req: Request, res: Response, next: NextFunction) => {
        const { oldPassword, newPassword }: Record<string, string> = req.body;
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler("Please Enter the newPassword and oldPassword", 400));
        }
        try {
            const user = await this.userService.getUserById((req as any).user.id, userModel);
            if (!user) return next(new ErrorHandler("user not found", 400));
            const validPw = await this.userService.validPassword(oldPassword, user.password);
            if (!validPw) return next(new ErrorHandler("oldPassword is incorrect", 400));
            const change = await this.userService.changePassword(user, newPassword);
            res.status(200).json({
                success: true,
                message: "password changed successfully"
            })
        } catch (error) {
            next(error);
        }
    }
    // Get User Profile - api/v1/myprofile
    public getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const getuserprofile = await this.userService.getUserById((req as any).user.id, userModel);
            if (!getuserprofile) return next(new ErrorHandler("user not found", "400"));
            res.status(200).json({
                success: true,
                getuserprofile
            })
        } catch (error) {
            next(error);
        }
    }
    // update User Profile - api/v1/update
    public updateUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updateuserprofile = await this.userService.updateUserById((req as any).user.id, req.body, userModel);
            if (!updateuserprofile) return next(new ErrorHandler("User not found", 400));
            res.status(200).json({
                success: true,
                message: "updated Sucessfully",
                updateuserprofile
            })
        } catch (error) {
            next(error);
        }
    }
    // delete User Profile - api/v1/delete
    public deleteUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deleteuserprofile = await this.userService.deleteUserById((req as any).user.id, userModel);
            if (!deleteuserprofile) return next(new ErrorHandler("User not found", 401));
            res.status(200).json({
                success: true,
                message: "Deleted Successfully"
            })
        } catch (error) {
            next(error);
        }
    }
    // Get All Users - api/v1/admin/users
    public getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const getallusers = await this.userService.getAllUsers(userModel);
            if (!getallusers) return next(new ErrorHandler("Users Not Found", 400));
            res.status(200).json({
                success: true,
                users: getallusers.length,
                getallusers
            })
        } catch (error) {
            next(error);
        }
    }
    // Get User - api/v1/admin/user/:id
    public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("reqparamsC", req.params);
        try {
            const getuser = await this.userService.getUserById(req.params.id, userModel);
            if (!getuser) return next(new ErrorHandler("user not found", 400));
            res.status(200).json({
                success: true,
                getuser
            })
        } catch (error) {
            next(error);
        }
    }
    // update User - api/v1/admin/user/:id
    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updateuser = await this.userService.updateUserById(req.params.id, req.body, userModel);
            if (!updateuser) return next(new ErrorHandler("User not found", 400));
            res.status(200).json({
                success: true,
                message: "updated Sucessfully",
                updateuser
            })
        } catch (error) {
            next(error);
        }
    }
    // delete User  - api/v1/admin/user/:id
    public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deleteuser = await this.userService.deleteUserById(req.params.id, userModel);
            if (!deleteuser) return next(new ErrorHandler("User not found", 401));
            res.status(200).json({
                success: true,
                message: "Deleted Successfully"
            })
        } catch (error) {
            next(error);
        }
    }

}