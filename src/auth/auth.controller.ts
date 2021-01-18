import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/DTO/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.signIn(createUserDto)
    }

}
