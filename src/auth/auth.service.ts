import { Injectable } from '@nestjs/common';
import { UserServices } from 'src/user/user.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';
import * as jwt from 'jsonwebtoken'
import { hashGenerator } from 'src/utils/hash-generator';



@Injectable()
export class AuthService {
    constructor(private usersService: UserServices) { }

    // async validateUser(email: string, password: string): Promise<any> {
    //     const user = await this.usersService.findOne(email)
    //     if (user && user.passwordHash === password) {
    //         const { passwordHash, ...result } = user
    //         return result;
    //     }
    //     return null
    // }

    async signIn(userDto: CreateAuthUserDto) {
        const hashedPass = {...userDto, passwordHash: hashGenerator(userDto)}
        const token = jwt.sign(userDto, 'secret')
        const user = await this.usersService.findEmail(userDto.email)
        if (user && user.passwordHash === hashedPass.passwordHash) {
            return { token: token }
        }
        return 'Email or password is not exist in dadabase, SignUp please'
    }

    signUp(userDto: CreateAuthUserDto) {
        const token = jwt.sign(userDto, 'secret')
        this.usersService.createUser(userDto)
        return { token: token }
    }
}
