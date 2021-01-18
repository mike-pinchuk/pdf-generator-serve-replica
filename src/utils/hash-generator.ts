import { createHash } from 'crypto'
import { CreateUserDto } from 'src/user/DTO/create-user.dto'


export const hashGenerator = (dto: CreateUserDto): string => {
    const hash = createHash('sha384')
    const data = hash.update(dto.passwordHash, 'utf8')
    const gen_hash = data.digest('hex')
    return gen_hash
}