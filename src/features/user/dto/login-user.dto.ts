import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
    readonly email: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({ example: 'P@ssw0rd!', description: 'User password' })
    readonly password: string;

    @IsString()
    @MinLength(3)
    @ApiProperty({ example: 'session_id_123', description: 'Client session id' })
    readonly sessionId: string;
}
