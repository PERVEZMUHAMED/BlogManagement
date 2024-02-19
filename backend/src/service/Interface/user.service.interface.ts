import { Model } from "mongoose";
import User from "../../model/Interface/user.model.interface";

export default interface IUserService {
    createUser: (userData: User, usermodel: Model<User>) => Promise<User>;
    existUser: (userData: Record<string, string>, usermodel: Model<User>) => Promise<User | null>;
    existEmail: (userData: Record<string, string>, usermodel: Model<User>) => Promise<User | null>;
    validPassword: (password: string, hashPasword: string) => Promise<boolean>;
    generateToken: (userData: User) => string;
    changePassword: (user: User, newPassword: string) => Promise<void | null>;
    getUserById: (userId: string, model: Model<User>) => Promise<User>
    updateUserById: (userId: string, userData: Record<string, unknown>, model: Model<User>) => Promise<User>
    deleteUserById: (userId: string, model: Model<User>) => Promise<User>
    getAllUsers: (model: Model<User>) => Promise<Array<User>>
}
