import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @ApiPropertyOptional({ example: 1, description: 'Page number' })
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page?: number;

    @ApiPropertyOptional({ example: 10, description: 'Items per page' })
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit?: number;
}
