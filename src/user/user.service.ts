
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./DTO/create-user.dto";

@Injectable()
export class UserServices {
    private users = []

    getAll() {
        return this.users
    }

    getUserById(id) {
        return this.users.find(user => user.id === id)
    }

    createUser(userDto: CreateUserDto) {
        this.users.push({
            ...userDto,
            id: Date.now().toString()            
        })
        return {
            users: this.users
        }
    }
}