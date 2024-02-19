import "reflect-metadata";
import { inject, injectable } from "inversify";
import IPostRepository from "./Interface/post.repository";
import { Model } from "mongoose";

@injectable()
export default class PostRepository implements IPostRepository {

    public Create = async<T>(args: T, model: Model<T>): Promise<T> => {
        try {
            const createData = await model.create(args);
            return createData;
        } catch (error) {
            return error;
        }
    }
    public Find = async<T>(model: Model<T>): Promise<T[]> => {
        try {
            const Find = await model.find();
            return Find;
        } catch (error) {
            return error;
        }
    }
    public FindOne = async<T>(args: Record<string, unknown>, model: Model<T>): Promise<T> => {
        try {
            const findone = await model.findOne(args);
            return findone;
        } catch (error) {
            return error;
        }
    }
    public FindById = async<T>(args: string, model: Model<T>): Promise<T> => {
        try {
            const findbyid = await model.findById(args);
            return findbyid;
        } catch (error) {
            return error;
        }
    }
    public FindByIdAndUpdate = async<T>(id: string, args: Record<string, unknown>, model: Model<T>): Promise<T> => {
        try {
            const findbyidandupdate = await model.findByIdAndUpdate(args);
            return findbyidandupdate;
        } catch (error) {
            return error;
        }
    }
    public FindByIdAndDelete = async<T>(args: string, model: Model<T>): Promise<T> => {
        try {
            const findbyidanddelete = await model.findByIdAndDelete(args);
            return findbyidanddelete;
        } catch (error) {
            return error;
        }
    }
}