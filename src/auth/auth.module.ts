import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule { }
