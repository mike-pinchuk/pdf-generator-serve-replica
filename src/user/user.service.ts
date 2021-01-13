
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
        this.usersRepository.insert(userDto)
        return this.getAll()
        // this.users.push({
        //     ...userDto,
        //     id: Date.now().toString()
        // })
        // return {
        //     users: this.users
        // }
    }
}