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

    async getUserByEmailIncludingDeleted(email: string): Promise<User | null> {
        return await this.userRepository().findOne({
            where: { email },
            withDeleted: true,
        });
    }

    async restoreUser(dto: CreateUserDto): Promise<User> {
        const user = await this.getUserByEmailIncludingDeleted(dto.email);

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        await this.userRepository().restore(user.id);

        user.login = dto.login;
        user.email = dto.email;
        user.password = dto.password;
        user.age = dto.age;
        user.description = dto.description ?? '';

        return await this.userRepository().save(user);
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
