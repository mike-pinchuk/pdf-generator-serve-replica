import { createHash } from 'crypto'

export const hashGenerator = (originString: string): string => {
    return createHash('sha384').update(originString, 'utf8').digest('hex')
}