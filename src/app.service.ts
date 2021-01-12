import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly started: number;
  private readonly startedAt: Date;

  constructor() {
    this.startedAt = new Date();
    this.started = this.startedAt.getTime();
  }

  getHealthInfo() {
    return {
      since: this.startedAt,
      uptime: Date.now() - this.started,
    };
  }
}
