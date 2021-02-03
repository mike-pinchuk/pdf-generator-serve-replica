import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthorizedRequest } from '../utils/types';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req: AuthorizedRequest) {
        return this.userService.getUserById(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

}
