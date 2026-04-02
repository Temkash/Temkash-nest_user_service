import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RefreshTokensDto {
    @IsString()
    @MinLength(10)
    @ApiProperty({ description: 'Refresh token string' })
    refreshToken: string;

    @IsString()
    @MinLength(3)
    @ApiProperty({ example: 'session_id_123', description: 'Client session id' })
    sessionId: string;
}
