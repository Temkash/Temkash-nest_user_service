import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user-repository.interface';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    //methods
}
