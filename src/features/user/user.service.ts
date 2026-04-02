import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from './user-repository.interface';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import * as bcrypt from 'bcryptjs';
import { ResponseUserDto } from './dto/user-response.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: IUserRepository) { }

    async createUser(dto: CreateUserDto) {
        return await this.userRepository.createUser(dto);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.getUserByEmail(email);
    }

    async paginate(query: PaginationQueryDto) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        return await this.userRepository.paginate({ page, limit });
    }

    async getMyProfile(email: string) {
        const user = await this.userRepository.getUserByEmail(email);
        return user ? this.toResponseUserDto(user) : null;
    }

    async getUserProfileByEmail(email: string) {
        const user = await this.userRepository.getUserByEmail(email);
        return user ? this.toResponseUserDto(user) : null;
    }

    async getPaginatedUsers(query: PaginationQueryDto) {
        const response = await this.paginate(query);
        return {
            ...response,
            items: response.items.map((user: User) => this.toResponseUserDto(user)),
        };
    }

    private toResponseUserDto(user: User): ResponseUserDto {
        return {
            login: user.login,
            age: user.age,
            description: user.description,
        };
    }
}
