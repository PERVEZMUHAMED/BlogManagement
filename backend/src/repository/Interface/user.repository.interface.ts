import { JwtPayload } from "jsonwebtoken";
import { Document, Model } from "mongoose";

export default interface IUserRepository {
    Create: <T>(args: T, model: Model<T>) => Promise<T>
    FindOne: <T>(args: Record<string, unknown>, model: Model<T>) => Promise<T | null>
    FindById: <T>(args: string | Record<string, unknown>, model: Model<T>) => Promise<T | null>
    Find: <T>(model: Model<T>) => Promise<Array<T> | null>
    FindByIdAndUpdate: <T>(id: string, args: Record<string, unknown>, model: Model<T>) => Promise<T | null>
    FindByIdAndDelete: <T>(args: string, model: Model<T>) => Promise<T | null>
    Save: (args: any) => Promise<null>
}