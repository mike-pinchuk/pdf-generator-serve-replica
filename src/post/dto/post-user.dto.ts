import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty } from "class-validator"
import { date } from "joi"

export class CreatePostUserDto {
    @IsNotEmpty()
    @ApiProperty({example: 'Some Article'})
    readonly title: string

    @IsNotEmpty()
    @ApiProperty({example: 'Some text wich shows your personal oppinion and uniqueness'})
    readonly content: string

    @IsDate()
    @ApiProperty()
    readonly createdAt: Date

    @IsDate()
    @ApiProperty()
    readonly updatedAt: Date
}