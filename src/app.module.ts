import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HeadlessChromeModule} from "./headless-chrome/headless-chrome.module";
import { UserModule } from './user/user.module';

@Module({
  imports: [HeadlessChromeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
