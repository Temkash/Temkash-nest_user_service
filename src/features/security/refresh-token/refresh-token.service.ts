import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IRefreshTokenRepository } from './refresh-token-repository.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/features/user/user.model';

@Injectable()
export class RefreshTokenService {
    constructor(
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private jwtService: JwtService
    ) {}


    async generateSessionToken(user, sessionId){
        const payload = { email: user.email, id: user.id };
        const refreshToken = this.jwtService.sign(payload)
        const tokenHash = await bcrypt.hash(refreshToken, 5);
        await this.refreshTokenRepository.deleteToken(user, sessionId);
        await this.refreshTokenRepository.saveToken(user, tokenHash, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), sessionId);
        return refreshToken
    }

    async findRefreshToken(user, sessionId){
        return await this.refreshTokenRepository.findToken(user, sessionId);
    }

    async deleteRefreshToken(user, sessionId){
        await this.refreshTokenRepository.deleteToken(user, sessionId);
    }

    async verifyToken(token: string){
        try {
            const payload = this.jwtService.verify(token);
            return payload;
        } catch (e) {
            return null;
        }
    }

    async refreshToken(refreshToken: string, user: User, sessionId: string){
        try {
            const tokenHash = await this.findRefreshToken(user, sessionId);
            if (!tokenHash) {
                throw new UnauthorizedException('Токен не найден');
            }
            const tokenMatch = await bcrypt.compare(refreshToken, tokenHash);
            if (!tokenMatch) {
                throw new UnauthorizedException('Неверный токен');
            }
            return await this.generateSessionToken(user, sessionId);
        } catch (e) {
            throw e;
        }
    }
}
