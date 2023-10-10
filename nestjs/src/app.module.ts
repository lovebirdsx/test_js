import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController, CalcController } from './app.controller';
import { AppService, CalcService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatsModule } from './cats/cat.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController, CalcController],
  providers: [AppService, CalcService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
