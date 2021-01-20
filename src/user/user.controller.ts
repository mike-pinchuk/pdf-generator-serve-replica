import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
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

    @Get(':email')
    getEmail(@Query('email') email: string) {
        console.log(email);
        return this.userService.findOne(email)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }
}
