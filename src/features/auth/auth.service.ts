import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AccessTokenService } from '../security/access-token/access-token.service';
import { RefreshTokenService } from '../security/refresh-token/refresh-token.service';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private accessTokenService: AccessTokenService,
        private refreshTokenService: RefreshTokenService
    ) { }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto);
        const accessToken = await this.accessTokenService.generateToken(user);
        const refreshToken = await this.refreshTokenService.generateSessionToken(user, userDto.sessionId);
        return {
            accessToken,
            refreshToken
        };
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        const accessToken = await this.accessTokenService.generateToken(user);
        const refreshToken = await this.refreshTokenService.generateSessionToken(user, userDto.sessionId);
        return {
            accessToken,
            refreshToken
        };
    }

    async refresh(refreshDto: RefreshTokensDto) {
        const payload = await this.refreshTokenService.verifyToken(refreshDto.refreshToken);
        if (!payload) {
            throw new UnauthorizedException({ message: 'Неверный токен' });
        }
        const user = await this.userService.getUserByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException({ message: 'Пользователь не найден' });
        }
        const accessToken = await this.accessTokenService.generateToken(user);
        const refreshToken = await this.refreshTokenService.refreshToken(refreshDto.refreshToken, user ,refreshDto.sessionId);
        return {
            accessToken,
            refreshToken
        };
    }

    async logout(refreshDto: RefreshTokensDto) {
        const payload = await this.refreshTokenService.verifyToken(refreshDto.refreshToken);
        if (!payload) {
            return { message: 'Сессия уже не активна' };
        }
        const user = await this.userService.getUserByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException({ message: 'Пользователь не найден' });
        }
        await this.refreshTokenService.deleteRefreshToken(user, refreshDto.sessionId);
        return { message: 'Успешный выход' };
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);

        if (!user) {
            throw new UnauthorizedException({ message: 'Неверный email или password' });
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Неверный email или password' });
    }

}
