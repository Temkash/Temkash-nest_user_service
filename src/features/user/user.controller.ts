import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../security/jwt-auth.guard';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { User } from './user.model';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/byEmail')
    findUserByEmail(@Body('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(@Query() query: PaginationQueryDto) {
    return this.userService.paginate(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/my')
    findMe(@Req() req) {
        return this.userService.getUserByEmail(req.user.email);
    }
}
