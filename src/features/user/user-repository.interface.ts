import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.model";

export abstract class IUserRepository {
    abstract findPostByIdWithCommentsOrFail(postId: number): Promise<User>;
    abstract createUser(dto: CreateUserDto): Promise<User>;
}