import {Body, Controller, Post, Res} from '@nestjs/common';
import {HeadlessChromeService} from './headless-chrome.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {SetupDefaultScreenDto} from './dto/create-pdf.dto';
import {Response} from 'express';

@ApiTags('PDF')
@Controller('headless-chrome')
export class HeadlessChromeController {
    constructor(private readonly headlessChromeService: HeadlessChromeService) {
    }

    @Post('/')
    @ApiOperation({summary: 'Create a new pdf.', description: 'If set the format field, takes priority over width or height options.'})
    async createPdf(@Body() body: SetupDefaultScreenDto, @Res() res: Response) {
        const pdfBuffer = await this.headlessChromeService.generatePdf({htmlTemplate: body.html, style: body.style},
            {format: body.format, width: body.width, height: body.height});
        res.status(200)
            .set({
                'Content-Type': 'application/pdf',
                'Content-Length': pdfBuffer.length.toString(),
            })
            .send(pdfBuffer);
    }
}
