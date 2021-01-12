import { Test, TestingModule } from '@nestjs/testing';
import { HeadlessChromeController } from './headless-chrome.controller';

describe('HeadlessChrome Controller', () => {
  let controller: HeadlessChromeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadlessChromeController],
    }).compile();

    controller = module.get<HeadlessChromeController>(HeadlessChromeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
