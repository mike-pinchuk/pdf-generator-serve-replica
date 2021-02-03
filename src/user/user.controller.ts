import { Controller, Get, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthorizedRequest } from '../utils/types';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Request() req: AuthorizedRequest) {
        return this.userService.getUserById(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException('ERROR_USER_NOT_FOUND');
        }
        return user;
    }
}
