import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostUserDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Some Article' })
    readonly title?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Some text which shows your personal opinion and uniqueness' })
    readonly content?: string;
}
