import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { LoggerService } from './modules/logger/logger.service'

@Controller()
export class AppController {
  // private readonly logger = new LoggerService()
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService
  ) {}

  @Get()
  getHello(): string {
    this.loggerService.info('123123', '123123')
    return this.appService.getHello()
  }
}
