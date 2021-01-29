import {IsEnum, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

enum DocumentFormat {
    Letter = 'Letter',
    Legal = 'Legal',
    Tabloid = 'Tabloid',
    Ledger = 'Ledger',
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    A3 = 'A3',
    A4 = 'A4',
    A5 = 'A5',
    A6 = 'A6',
}

// TODO implement more details validate based on Nested types
export class SetupDefaultScreenDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '<html>test</html>'})
    html!: string;

    @IsOptional()
    @IsString()
    @ApiProperty({example: 'html{margin:0;}'})
    style!: string;

    @IsOptional()
    @IsEnum(Object.values(DocumentFormat))
    @ApiProperty({example: 'A4', enum: Object.values(DocumentFormat), default: DocumentFormat.Letter})
    format: DocumentFormat = DocumentFormat.Letter;

    @IsOptional()
    @ApiProperty({example: 10})
    width!: number;

    @IsOptional()
    @ApiProperty({example: 10})
    height!: number;
}
