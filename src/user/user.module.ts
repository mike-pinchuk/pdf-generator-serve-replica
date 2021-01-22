import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { typedEnv } from "src/utils/typed-env";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserServices } from "./user.service";

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
        secret: typedEnv.JWT_SECRET,
        signOptions: { expiresIn: '60s' }
    })],
    controllers: [UserController],
    providers: [UserServices],
    exports: [UserServices]
})

export class UserModule { }