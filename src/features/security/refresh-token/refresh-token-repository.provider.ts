import { Provider } from "@nestjs/common";
import { IRefreshTokenRepository } from "./refresh-token-repository.interface";
import { DataSource } from "typeorm";
import { RefreshTokenRepository } from "./refresh-token-repository";


export const refreshTokenRepositoryProvider: Provider = {
    provide: IRefreshTokenRepository,
    useFactory: (dataSource: DataSource) => {
    return new RefreshTokenRepository(dataSource);
  },
  inject: [DataSource],
};