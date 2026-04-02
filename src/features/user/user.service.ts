import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from './user-repository.interface';
import { PaginationQueryDto } from './dto/pagination-query.dto';

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


}
