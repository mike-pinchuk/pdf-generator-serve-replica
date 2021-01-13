import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeadlessChromeModule } from "./headless-chrome/headless-chrome.module";
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typedEnv } from './utils/typed-env';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: typedEnv.DB_HOST,
    port: typedEnv.DB_PORT,
    username: typedEnv.DB_USER,
    password: typedEnv.DB_PASSWORD,
    database: typedEnv.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}']
  }),
    HeadlessChromeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
