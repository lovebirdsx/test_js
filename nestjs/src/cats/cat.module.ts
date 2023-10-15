import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';
import { DatabaseModule } from '../dababase/database.module';
import { CatsController } from './cats.controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
})
export class CatsModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
