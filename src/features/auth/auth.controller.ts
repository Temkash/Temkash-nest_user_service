import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: LoginUserDto){
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }

    @Post('/refresh')
    refresh(@Body() refreshDto: RefreshTokensDto){
        return this.authService.refresh(refreshDto)
    }

    @Post('/logout')
    logOut(@Body() refreshDto: RefreshTokensDto){
        return this.authService.logout(refreshDto)
    }
}
