import "reflect-metadata";
import { inject, injectable } from "inversify";
import IUserService from "./Interface/user.service.interface";
import IUserRepository from "../repository/Interface/user.repository.interface";
import { Model } from "mongoose";
import { compare, hash } from "bcrypt";
import User from "../model/Interface/user.model.interface";
import { TYPES } from "../di/TYPES";
import jwt from "jsonwebtoken";

@injectable()
export default class UserService implements IUserService {
    private readonly userRepo: IUserRepository;
    constructor(
        @inject(TYPES.UserRepository) private _userRepo: IUserRepository
    ) {
        this.userRepo = _userRepo;
    }

    public existUser = async (userData: Record<string, string>, usermodel: Model<User>): Promise<User> => {
        console.log("userDataS", userData);
        try {
            const existuser = await this.userRepo.FindOne(userData, usermodel);
            console.log("existuser", existuser);
            return existuser;
        } catch (error) {
            return error;
        }
    }
    public existEmail = async (userData: Record<string, string>, usermodel: Model<User>): Promise<User> => {
        try {
            const existemail = await this.userRepo.FindOne(userData, usermodel);
            return existemail;
        } catch (error) {
            return error;
        }
    }
    public createUser = async (userData: User, usermodel: Model<User>): Promise<User> => {
        console.log("userDataR", userData);
        try {
            const hashPassword: string = await hash(userData.password, 7);
            const user = await this.userRepo.Create({ ...userData, password: hashPassword }, usermodel);
            return user;
        } catch (error) {
            return error;
        }
    }
    public validPassword = async (password: string, hashPassword: string): Promise<boolean> => {
        try {
            const Compare = await compare(password, hashPassword);
            return Compare;
        } catch (error) {
            return error;
        }
    }
    public generateToken = (userData: User): string => {
        try {
            const { JWT_SECRET, JWT_EXPIRES_TIME } = process.env;
            const token = jwt.sign({ id: userData._id, role: userData.role }, JWT_SECRET,
                { expiresIn: JWT_EXPIRES_TIME });
            return token;
        } catch (error) {
            return error;
        }
    }
    public changePassword = async (user: User, newPassword: string): Promise<void> => {
        try {
            const hashPassword = await hash(newPassword, 7);
            user.password = hashPassword;
            await this.userRepo.Save(user);
        } catch (error) {
            return error;
        }
    }
    public getUserById = async (userId: string, model: Model<User>): Promise<User> => {
        try {
            const getuser = await this.userRepo.FindById(userId, model);
            console.log("getUserS", getuser);
            return getuser;
        } catch (error) {
            return error;
        }

    }
    public getAllUsers = async (model: Model<User>): Promise<Array<User>> => {
        try {
            const users = await this.userRepo.Find(model);
            return users;
        } catch (error) {
            return error;
        }
    }
    public updateUserById = async (userId: string, userData: Record<string, unknown>, model: Model<User>): Promise<User> => {
        try {
            const updateuser = await this.userRepo.FindByIdAndUpdate(userId, userData, model);
            return updateuser;
        } catch (error) {
            return error;
        }
    }
    public deleteUserById = async (userId: string, model: Model<User>): Promise<User> => {
        try {
            const deleteuser = await this.userRepo.FindByIdAndDelete(userId, model);
            return deleteuser;
        } catch (error) {
            return error;
        }
    }
}