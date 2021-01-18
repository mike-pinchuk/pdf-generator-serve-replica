
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashGenerator } from "src/utils/hash-generator";
import { Repository } from "typeorm";
import { CreateUserDto } from "./DTO/create-user.dto";
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

    findOne(email: string): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne(email)
    }

    createUser(userDto: CreateUserDto) {
        return this.usersRepository.save({ ...userDto, passwordHash: hashGenerator(userDto) })
    }
}