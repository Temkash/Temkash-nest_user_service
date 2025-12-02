import { Injectable } from "@nestjs/common";
import { BaseRepository } from "common/base.repository";
import { DataSource, EntityManager, Repository } from "typeorm";
import { User } from "./user.model";
import { IUserRepository } from "./user-repository.interface";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UserRepository extends BaseRepository implements IUserRepository{
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    private postRepository(entityManager?: EntityManager): Repository<User> {
        return this.getRepository(User, entityManager);
    }
    
    //example
    async findPostByIdWithCommentsOrFail(postId: number): Promise<User> {
        return this.postRepository().findOneOrFail({
            where: { id: postId },
        })
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const newUser = this.postRepository().create(dto);
        return await this.postRepository().save(newUser);
    }
}