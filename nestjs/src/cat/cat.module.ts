import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatService } from './cat.service';
import { catProviders } from './cat.providers';
import { DatabaseModule } from '../dababase/database.module';
import { CatController } from './cat.controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [CatController],
  providers: [CatService, ...catProviders],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatController);
  }
}
