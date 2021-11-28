import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { GlobalModule } from './modules/global/global.module'
import { LoggerService } from './modules/logger/logger.service'

@Module({
  imports: [AuthModule, GlobalModule.forRoot({ typeorm: true })],
  controllers: [AppController],
  providers: [AppService, LoggerService]
})
export class AppModule {}
