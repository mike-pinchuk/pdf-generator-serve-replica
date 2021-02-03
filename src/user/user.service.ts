import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashGenerator } from '../utils';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) { }

    async getUserById(id: string): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne(id);
    }

    async findByEmailWithHideField(email: string): Promise<UserEntity | undefined> {
        return this.usersRepository.createQueryBuilder('user')
          .select()
          .addSelect('user.passwordHash')
          .where('user.email = :email', { email })
          .getOne();
    }

    async createUser(email: string, password: string) {
        return this.usersRepository.save({ email, passwordHash: hashGenerator(password) });
    }
}
