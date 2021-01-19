import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'email@gmail.com' })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'test_password' })
    readonly passwordHash: string
}