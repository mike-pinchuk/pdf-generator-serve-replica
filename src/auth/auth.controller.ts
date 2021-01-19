import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post()
    createUser(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.authService.signIn(createAuthUserDto)
    }

}
