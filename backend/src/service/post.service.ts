import { inject, injectable } from "inversify";
import IPostService from "./Interface/post.service.interface";
import { TYPES } from "../di/TYPES";
import IPostRepository from "../repository/Interface/post.repository";
import { Model } from "mongoose";
import Post from "../model/Interface/post.model.interface";

@injectable()
export default class PostService implements IPostService {
    private readonly postRepo: IPostRepository;
    constructor(
        @inject(TYPES.PostRepository) private _postRepo: IPostRepository
    ) {
        this.postRepo = _postRepo;
    }
    public postCreate = async (postData: Post, model: Model<Post>): Promise<Post> => {
        try {
            const post = await this.postRepo.Create(postData, model);
            return post;
        } catch (error) {
            return error;
        }
    }
    public getPostById = async (postData, model) => {
        try {
            const getpost = await this.postRepo.FindById(postData, model);
            return getpost;
        } catch (error) {
            return error;
        }
    }
    public updatePostById = async (postData, postId, model) => {
        try {
            const updatepost = await this.postRepo.FindByIdAndUpdate(postId, postData, model);
            return updatepost;
        } catch (error) {
            return error;
        }
    }
    public deletePostById = async (postId: string, model: Model<Post>): Promise<Post> => {
        try {
            const deletepost = await this.postRepo.FindByIdAndDelete(postId, model);
            return deletepost;
        } catch (error) {
            return error;
        }
    }
    public getAllPosts = async (model: Model<Post>): Promise<Array<Post>> => {
        try {
            const getpost = await this.postRepo.Find(model);
            return getpost;
        } catch (error) {
            return error;
        }
    }
}