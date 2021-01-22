import { Controller, Get, Param, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }

}
