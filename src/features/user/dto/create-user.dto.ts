import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsInt, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    @ApiProperty({ example: 'john_doe', description: 'Unique login name for the user' })
    readonly login: string;

    @IsEmail()
    @ApiProperty({ example: 'john.doe@example.com', description: 'Email address for the user' })
    readonly email: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({ example: 'P@ssw0rd!', description: 'Password for the user account' })
    password: string;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @ApiProperty({ example: 30, description: 'Age of the user' })
    readonly age: number;

    @IsString()
    @ApiProperty({ example: 'A software developer with 10 years of experience.', description: 'Brief description about the user' })
    readonly description?: string;
}
