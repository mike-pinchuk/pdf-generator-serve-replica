import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserServices } from './user.service';

@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserServices) { }

    @Get()
    getAllUsers() {
        return this.userService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.userService.getUserById(req.user.id);
    }

    @Get(':id')
    getUser(@Param('id') id) {
        return this.userService.getUserById(id);
    }

}
