import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHeathState(): string {
    return 'Health check endpoint';
  }

  @Get('data')
  getData() {
    return {
      data: 'hello guy!',
    };
  }
}
