import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    // @UseGuards(LocalAuthGuard)
    // @Post('auth/login')
    // async login(@Request() req) {
    //     return req.user
    // }

    @Post()
    createUser(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.authService.signIn(createAuthUserDto)
    }

}
