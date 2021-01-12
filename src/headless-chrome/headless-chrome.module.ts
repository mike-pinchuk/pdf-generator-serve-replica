import { Module } from '@nestjs/common';
import { HeadlessChromeService } from './headless-chrome.service';
import { HeadlessChromeController } from './headless-chrome.controller';

@Module({
  imports: [],
  controllers: [HeadlessChromeController],
  providers: [HeadlessChromeService],
  exports: [HeadlessChromeService],
})
export class HeadlessChromeModule {
}
