import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user
  }

  @Get()
  @ApiOperation({ summary: 'Get server uptime info' })
  root() {
    return this.appService.getHealthInfo();
  }
}
