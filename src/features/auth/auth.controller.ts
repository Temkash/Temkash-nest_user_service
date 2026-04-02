import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import { RegistrationDto } from '../user/dto/registration.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Login user' })
    @Post('/login')
    login(@Body() userDto: LoginUserDto){
        return this.authService.login(userDto)
    }

    @ApiOperation({ summary: 'Register user' })
    @Post('/registration')
    registration(@Body() userDto: RegistrationDto){
        return this.authService.registration(userDto)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Refresh access and refresh tokens' })
    @Post('/refresh')
    refresh(@Body() refreshDto: RefreshTokensDto){
        return this.authService.refresh(refreshDto)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Logout current session' })
    @Post('/logout')
    logOut(@Body() refreshDto: RefreshTokensDto){
        return this.authService.logout(refreshDto)
    }
}
