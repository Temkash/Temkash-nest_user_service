import { User } from "src/features/user/user.model";

export abstract class IRefreshTokenRepository {
    abstract saveToken(user: User, tokenHash: string, expiresAt: Date, sessionId: string): Promise<void>;
    abstract findToken(user: User, sessionId:string): Promise<string | undefined>;
    abstract deleteToken(user: User, sessionId:string): Promise<void>;
}