import { User } from "./user.model";

export abstract class IUserRepository {
    abstract findPostByIdWithCommentsOrFail(postId: number): Promise<User>;
}