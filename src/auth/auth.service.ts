import { HttpException, HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { UserServices } from 'src/user/user.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';
import * as jwt from 'jsonwebtoken'
import { hashGenerator } from 'src/utils/index';
import { typedEnv } from 'src/utils/typed-env';



@Injectable()
export class AuthService {
    constructor(private usersService: UserServices) { }

    async signIn(userDto: CreateAuthUserDto): Promise<any> {
        const user = await this.usersService.findEmail(userDto.email)
        if (user && user.passwordHash === hashGenerator(userDto.password)) {
            const token = jwt.sign({ id: user.id }, typedEnv.JWT_SECRET)
            return { token: token }
        }
        throw new HttpException('Credential is not valid', HttpStatus.NOT_FOUND)
    }

    async signUp(userDto: CreateAuthUserDto) {
        const user = await this.usersService.createUser(userDto)
        const token = jwt.sign({ id: user.id }, typedEnv.JWT_SECRET)
        return { token: token }
    }

}
