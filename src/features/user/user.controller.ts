import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../security/jwt-auth.guard';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { User } from './user.model';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Find user by email' })
    @ApiQuery({ name: 'email', required: true, type: String })
    @UseGuards(JwtAuthGuard)
    @Get('/byEmail')
    findUserByEmail(@Query('email') email: string) {
        return this.userService.getUserProfileByEmail(email);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(@Query() query: PaginationQueryDto) {
        return this.userService.getPaginatedUsers(query);
    }

    @ApiOperation({ summary: 'Get current user' })
    @UseGuards(JwtAuthGuard)
    @Get('/my')
    findMe(@Req() req) {
        return this.userService.getMyProfile(req.user.email);
    }
}
