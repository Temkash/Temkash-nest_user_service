import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../security/jwt-auth.guard';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findUserByEmail(@Body('email') email: string) {
        return this.userService.getUserByEmail(email);
    }
}
