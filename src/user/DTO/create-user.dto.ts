import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '<html>test_login</html>'})
    readonly login: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '<html>test_password</html>'})
    readonly password: string
}