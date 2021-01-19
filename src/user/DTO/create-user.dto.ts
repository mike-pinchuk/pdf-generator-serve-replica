import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example: '<html>test_email</html>'})
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '<html>test_password</html>'})
    readonly password: string
}