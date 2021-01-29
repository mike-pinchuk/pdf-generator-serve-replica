import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post('signup')
    createUser(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.authService.signUp(createAuthUserDto);
    }

    @Post('signin')
    findEmail(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.authService.signIn(createAuthUserDto);
    }

}
