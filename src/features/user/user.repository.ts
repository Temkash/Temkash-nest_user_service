import { Injectable } from "@nestjs/common";
import { BaseRepository } from "common/base.repository";
import { EntityManager, Repository } from "typeorm";
import { User } from "./user.model";
import { IUserRepository } from "./user-repository.interface";


@Injectable()
export class UserRepository extends BaseRepository implements IUserRepository{
    private postRepository(entityManager?: EntityManager): Repository<User> {
        return this.getRepository(User, entityManager);
    }
    
    //example
    async findPostByIdWithCommentsOrFail(postId: number): Promise<User> {
        return this.postRepository().findOneOrFail({
            where: { id: postId },
        })
    }
}