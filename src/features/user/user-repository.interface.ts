import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.model";

export abstract class IUserRepository {
    abstract createUser(dto: CreateUserDto): Promise<User>;
    abstract getUserByEmail(email: string): Promise<User | null>;
    abstract getUserByLogin(login: string): Promise<User | null>;
    abstract getUserByEmailIncludingDeleted(email: string): Promise<User | null>;
    abstract restoreUser(dto: CreateUserDto): Promise<User>;
    abstract softDeleteUserByEmail(email: string): Promise<void>;
    abstract paginate(options: { page: number; limit: number }): Promise<{
        items: User[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>
}
