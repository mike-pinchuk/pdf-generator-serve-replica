import { Injectable } from '@nestjs/common';
import { UserServices } from 'src/user/user.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';
import * as jwt from 'jsonwebtoken'



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
        const user = await this.usersService.findOne(userDto.email)
        if(user && user.passwordHash === userDto.passwordHash) {
            const token = jwt.sign(userDto, 'secret')
            return {token: token}
        }
        return 'It is not working'
        // const token = jwt.sign(userDto, 'secret')
        
        // if(userDto.email === findedEmail && userDto.passwordHash === findedPass) {}

        // const token = jwt.sign(this.usersService.createUser(userDto), 'secret')
        
        // return {token: token} 
    }

    signUp(userDto: CreateAuthUserDto) {
        const token = jwt.sign(userDto, 'secret')
        this.usersService.createUser(userDto)
        return { token: token }
    }
}
