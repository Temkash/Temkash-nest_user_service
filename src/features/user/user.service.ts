import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from './user-repository.interface';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async createUser(dto: CreateUserDto){
        return await this.userRepository.createUser(dto);
    }

    async getUserByEmail(email: string){
        return await this.userRepository.getUserByEmail(email);
    }



    async getAllUsers(){

    }
}
