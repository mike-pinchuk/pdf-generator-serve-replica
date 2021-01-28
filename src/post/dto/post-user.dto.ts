import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsNotEmpty } from "class-validator"

export class CreatePostUserDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'Some Article' })
    readonly title: string

    @IsNotEmpty()
    @ApiProperty({ example: 'Some text wich shows your personal oppinion and uniqueness' })
    readonly content: string

    @Type(() => Date)
    @IsDate()
    @ApiProperty()
    readonly createdAt: Date

    @Type(() => Date)
    @IsDate()
    @ApiProperty()
    readonly updatedAt?: Date

    // @ApiProperty()
    // readonly userId: string
}