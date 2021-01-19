import { createHash } from 'crypto'
import { CreateAuthUserDto } from '../auth/dto/auth-user.dto'


export const hashGenerator = (dto: CreateAuthUserDto): string => {
    return createHash('sha384').update(dto.passwordHash, 'utf8').digest('hex')
}