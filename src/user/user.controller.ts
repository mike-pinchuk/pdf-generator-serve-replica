import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';

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

    // @Get(':email')
    // getEmail(@Query('email') email: string) {
    //     return this.userService.findEmail(email)
    // }

}
