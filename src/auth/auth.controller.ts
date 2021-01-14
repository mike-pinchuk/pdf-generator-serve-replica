import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post()
    authUser(@Body() authUser) {

    }
}
