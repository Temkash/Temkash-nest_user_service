import { Injectable } from "@nestjs/common";
import { BaseRepository } from "common/base.repository";
import { DataSource, EntityManager, Repository } from "typeorm";
import { User } from "./user.model";
import { IUserRepository } from "./user-repository.interface";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UserRepository extends BaseRepository implements IUserRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    private userRepository(entityManager?: EntityManager): Repository<User> {
        return this.getRepository(User, entityManager);
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository().create(dto);
        return await this.userRepository().save(newUser);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository().findOne({ where: { email } });
    }

    async softDeleteUserByEmail(email: string): Promise<void> {
        await this.userRepository().softDelete({ email });
    }

    async paginate(options: { page: number; limit: number }) {
        const { page, limit } = options;
        const skip = (page - 1) * limit;

        const [users, total] = await this.userRepository().findAndCount({
            skip,
            take: limit,
        });

        return {
            items: users,
            meta: {
                totalItems: total,
                itemCount: users.length,
                itemsPerPage: limit,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
            },
        };
    }
}
