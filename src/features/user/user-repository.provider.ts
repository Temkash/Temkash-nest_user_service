import { Provider } from "@nestjs/common";
import { IUserRepository } from "./user-repository.interface";
import { UserRepository } from "./user.repository";
import { DataSource } from "typeorm";


export const userRepositoryProvider: Provider = {
    provide: IUserRepository,
    useFactory: (dataSource: DataSource) => {
    return new UserRepository(dataSource);
  },
  inject: [DataSource],
};