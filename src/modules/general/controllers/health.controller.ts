import { Injectable, Get, Controller } from '@nestjs/common';
@Injectable()
@Controller('health')
export class HealthController {
  @Get()
  healthCheck() {
    return {
      at: new Date(),
      version: '__VERSION__',
    };
  }
}
