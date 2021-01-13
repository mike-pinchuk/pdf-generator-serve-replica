import { Controller, Get, HttpCode, HttpStatus, Param, Post, Header, Body } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { UserServices } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserServices) { }

    @Get()
    getAllUsers() {
        return this.userService.getAll()
    }

    @Get(':id')
    getUser(@Param('id') id) {
        return this.userService.getUserById(id)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }
}
