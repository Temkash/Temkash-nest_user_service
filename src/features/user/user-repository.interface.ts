import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.model";

export abstract class IUserRepository {
    abstract createUser(dto: CreateUserDto): Promise<User>;
    abstract getUserByEmail(email: string): Promise<User | null>;
    //это похоже какой-то рудимент без применения 
    abstract findPostByIdWithCommentsOrFail(postId: number): Promise<User>;
}