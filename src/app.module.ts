import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HeadlessChromeModule} from "./headless-chrome/headless-chrome.module";
import { UserController } from './user/user.controller';
import { UserServices } from './user/user.service';

@Module({
  imports: [HeadlessChromeModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserServices],
})
export class AppModule {}
