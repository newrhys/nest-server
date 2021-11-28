import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggerService } from './modules/logger/logger.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 注入日志
  const loggerService = app.get(LoggerService)
  // console.log(loggerService)
  app.useLogger(loggerService)
  await app.listen(3000)
}

bootstrap()
