
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { string } from "joi";
import { Repository } from "typeorm";
import { CreateUserDto } from "./DTO/create-user.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserServices {
    constructor(@InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
    ) { }
    private users = []

    getAll(): Promise<UserEntity[]> {
        return this.usersRepository.find()
    }

    getUserById(id: string): Promise<UserEntity> {
        return this.usersRepository.findOne(id)
    }

    createUser(userDto: CreateUserDto) {
        this.usersRepository.save(userDto)
        return `Email ${userDto.email} has successfully been added`
    }
}