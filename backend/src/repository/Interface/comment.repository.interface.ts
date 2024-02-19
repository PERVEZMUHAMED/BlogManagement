import { Model } from "mongoose";

export default interface ICommentRepository {
    Create: <T>(args: T, model: Model<T>) => Promise<T>;
    Find: <T>(model: Model<T>) => Promise<T[]>;
    FindOne: <T>(args: Record<string, unknown>, model: Model<T>) => Promise<T>;
    FindById: <T>(args: string, model: Model<T>) => Promise<T>;
    FindByIdAndUpdate: <T>(id: string, args: Record<string, unknown>, model: Model<T>) => Promise<T>;
    FindByIdAndDelete: <T>(args: string, model: Model<T>) => Promise<T>;
}