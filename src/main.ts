import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggerService } from './modules/logger/logger.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

const logger = new LoggerService()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 注入日志
  const loggerService = app.get(LoggerService)
  app.useLogger(loggerService)
  // 获取配置服务
  const configService = app.get<ConfigService>(ConfigService)
  // swagger 接口文档
  const swagger = configService.get('swagger')
  const serve = configService.get('serve')
  app.setGlobalPrefix(serve.prefix)
  logger.info(serve, 'swagger configuration')
  const documentBuilder = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .addBearerAuth()
    .addServer(serve.prefix)
    .build()
  const document = SwaggerModule.createDocument(app, documentBuilder, {
    ignoreGlobalPrefix: true
  })
  SwaggerModule.setup(swagger.path, app, document)
  await app.listen(3000)
}

bootstrap().then(() => {
  logger.info('3000', '启动成功')
})
