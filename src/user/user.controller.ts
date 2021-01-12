import { Controller, Get, HttpCode, HttpStatus, Param, Post, Header, Body } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { UserServices } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserServices) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'json/application')
    getAllUsers() {
        return this.userService.getAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'json/application')
    getUser(@Param('id') id) {
        return this.userService.getUserById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'json/application')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }
}
