import { Injectable } from "@nestjs/common";
import { IRefreshTokenRepository } from "./refresh-token-repository.interface";
import { DataSource } from "typeorm";
import { User } from "src/features/user/user.model";
import { RefreshToken } from "./refresh-token.model";


@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
    constructor(private dataSource: DataSource) {}

    private refreshTokenRepository() {
        return this.dataSource.getRepository(RefreshToken);
    }

    async saveToken(user: User, tokenHash: string, expiresAt: Date, sessionId: string): Promise<void> {
        await this.refreshTokenRepository().save({ user, tokenHash, expiresAt, sessionId });
    }

    async findToken(user: User, sessionId: string): Promise<string | undefined> {
        return await this.refreshTokenRepository().findOne({ where: { user: { id: user.id }, sessionId } }).then(token => token?.tokenHash);
    }
    
    async deleteToken(user: User, sessionId:string): Promise<void> {
        const token = await this.findToken(user, sessionId);
        if (token){
            await this.refreshTokenRepository().delete({ user, sessionId });
        }
    }
}