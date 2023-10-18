import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { articleProviders } from './article.providers';
import { DatabaseModule } from '../dababase/database.module';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [DatabaseModule, CaslModule],
  controllers: [ArticleController],
  providers: [ArticleService, ...articleProviders],
})
export class ArticleModule {}
