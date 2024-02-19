import { Container } from "inversify";
import { TYPES } from "./TYPES";
import IUserRepository from "../repository/Interface/user.repository.interface";
import UserRepository from "../repository/user.repository";
import IUserService from "../service/Interface/user.service.interface";
import UserService from "../service/user.service";
import IUserController from "../controller/Interface/user.controller.interface";
import UserController from "../controller/user.controller";
import IAuthMiddleware from "../middleware/Interface/authenticate.interface";
import AuthMiddleware from "../middleware/authenticate";
import IPostRepository from "../repository/Interface/post.repository";
import PostRepository from "../repository/post.repository";
import IPostService from "../service/Interface/post.service.interface";
import PostService from "../service/post.service";
import IPostController from "../controller/Interface/post.controller.interface";
import PostController from "../controller/post.controller";
import ICommentRepository from "../repository/Interface/comment.repository.interface";
import CommentRepository from "../repository/comment.repository";
import ICommentService from "../service/Interface/comment.service.interface";
import CommentService from "../service/comment.service";
import ICommentController from "../controller/Interface/comment.controller.interface";
import CommentController from "../controller/comment.controller";

const container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserController>(TYPES.UserController).to(UserController);

container.bind<IAuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

container.bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);
container.bind<IPostService>(TYPES.PostService).to(PostService);
container.bind<IPostController>(TYPES.PostController).to(PostController);
container.bind<ICommentRepository>(TYPES.CommentRepository).to(CommentRepository);
container.bind<ICommentService>(TYPES.CommentService).to(CommentService);
container.bind<ICommentController>(TYPES.CommentController).to(CommentController);

// container.bind<>().to();

export const user = container.get<IUserController>(TYPES.UserController);
export const auth = container.get<IAuthMiddleware>(TYPES.AuthMiddleware);
export const post = container.get<IPostController>(TYPES.PostController);
export const comment = container.get<ICommentController>(TYPES.CommentController);
