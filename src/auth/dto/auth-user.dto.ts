import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'some_email@gmail.com' })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'some_password' })
    readonly password: string
}