import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { hashGenerator } from '../utils';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {

    }

    @Post('signup')
    async signUp(@Body() signUpDto: CreateAuthUserDto) {
        const existUser = await this.userService.findByEmailWithHideField(signUpDto.email);
        if (existUser) {
          throw new BadRequestException('ERROR_USER_WITH_THIS_EMAIL_EXIST');
        }
        const user = await this.userService.createUser(signUpDto.email, signUpDto.password);
        return this.authService.createToken(user.id);
    }

    @Post('signin')
    async signIn(@Body() signInDto: CreateAuthUserDto) {
        const user = await this.userService.findByEmailWithHideField(signInDto.email);
        if (!user || user.passwordHash !== hashGenerator(signInDto.password)) {
            throw new NotFoundException('ERROR_CREDENTIAL_IS_NOT_VALID');
        }
        return this.authService.createToken(user.id);
    }

}
