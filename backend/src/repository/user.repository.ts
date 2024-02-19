import "reflect-metadata";
import IUserRepository from "./Interface/user.repository.interface";
import { injectable } from "inversify";
import { Document, Model } from "mongoose";

@injectable()
export default class UserRepository implements IUserRepository {
    public Create = async <T>(args: T, model: Model<T>): Promise<T> => {
        console.log(args);
        try {
            const create = await model.create(args);
            return create;
        } catch (error) {
            return error;
        }
    }
    public FindOne = async <T>(args: Record<string, unknown>, model: Model<T>): Promise<T> => {
        try {
            const findOne = await model.findOne(args);
            return findOne;
        } catch (error) {
            return error;
        }
    }
    public FindById = async <T>(args: string, model: Model<T>): Promise<T> => {
        try {
            const findbyid = await model.findById(args);
            return findbyid;
        } catch (error) {
            return error;
        }
    }
    public FindByIdAndUpdate = async <T>(id: string, args: Record<string, unknown>, model: Model<T>): Promise<T> => {
        try {
            const findbyidandupdate = await model.findByIdAndUpdate(id,
                { $set: args }, { new: true, runValidators: true });
            return findbyidandupdate;
        } catch (error) {
            return error;
        }
    }
    public FindByIdAndDelete = async <T>(args: string | Record<string, unknown>, model: Model<T>): Promise<T> => {
        try {
            const findbyidanddelete = await model.findByIdAndDelete(args);
            return findbyidanddelete;
        } catch (error) {
            return error;
        }
    }
    public Find = async <T>(model: Model<T>): Promise<Array<T>> => {
        try {
            Document
            const Find = await model.find();
            return Find;
        } catch (error) {
            return error;
        }
    }
    public Save = async (args: any): Promise<null> => {
        try {
            await args.save();
        } catch (error) {
            return error;
        }

    }
}