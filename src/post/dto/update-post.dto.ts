import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePostUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Some Article' })
    readonly title!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Some text which shows your personal opinion and uniqueness' })
    readonly content!: string;
}