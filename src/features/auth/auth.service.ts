import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { SecurityService } from '../security/security.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private securityService: SecurityService
    ) { }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto);
        return this.securityService.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        return this.securityService.generateToken(user);
    }

    async getUsersByEmail(email: string) {
        const user = await this.userService.getUserByEmail(email);
        return user;
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);

        if (!user) {
            throw new UnauthorizedException({ message: 'Неверный email или password' });
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Неверный email или password' });
    }

}
