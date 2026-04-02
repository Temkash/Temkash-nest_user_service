import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class RegistrationDto extends CreateUserDto {

    @IsString()
    @MinLength(3)
    @ApiProperty({ example: 'session_id_123', description: 'Session ID for the user' })
    readonly sessionId: string;
}
