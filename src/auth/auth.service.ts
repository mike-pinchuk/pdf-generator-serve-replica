import { Injectable } from '@nestjs/common';
import { UserServices } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserServices) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email)
        if(user && user.passwordHash === password) {
            const {passwordHash, ...result} = user
            return result;
        }
        return null
    }
}
