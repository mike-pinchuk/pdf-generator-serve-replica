import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostUserDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'Some Article' })
    readonly title!: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'Some text which shows your personal opinion and uniqueness' })
    readonly content!: string;
}
