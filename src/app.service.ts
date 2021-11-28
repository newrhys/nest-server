import { Injectable } from '@nestjs/common'
import { LoggerService } from './modules/logger/logger.service'

@Injectable()
export class AppService {
  constructor(private readonly loggerService: LoggerService) {}
  getHello(): string {
    this.loggerService.log('123', '12312')
    return 'Hello World'
  }
}
