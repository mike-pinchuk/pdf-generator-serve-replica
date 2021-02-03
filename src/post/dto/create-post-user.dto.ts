import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Some Article' })
  readonly title!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Some text which shows your personal opinion and uniqueness' })
  readonly content!: string;
}
