import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDto {

    @ApiProperty({ example: 'john_doe', description: 'Unique login name for the user' })
    readonly login: string;

    @ApiProperty({ example: 30, description: 'Age of the user' })
    readonly age: number;

    @ApiProperty({ example: 'A software developer with 10 years of experience.', description: 'Brief description about the user' })
    readonly description: string;
}