
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashGenerator } from "src/utils/index";
import { Repository } from "typeorm";
import { CreateAuthUserDto } from "../auth/dto/auth-user.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserServices {
    constructor(@InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
    ) { }

    getAll(): Promise<UserEntity[]> {
        return this.usersRepository.find()
    }

    getUserById(id: string): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne(id)
    }

    findEmail(email): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne({ email: email })
    }

    createUser(userDto: CreateAuthUserDto) {
        return this.usersRepository.save({ ...userDto, passwordHash: hashGenerator(userDto.password) })
    }
}
