import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthorizedRequest } from 'src/utils/types';
import { UserServices } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserServices) { }

    @Get()
    getAllUsers() {
        return this.userService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: AuthorizedRequest) {
        return this.userService.getUserById(req.user.id);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

}
