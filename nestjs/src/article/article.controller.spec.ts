import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { articleProviders } from './article.providers';
import { DatabaseTestModule } from '../dababase/database.test.module';

describe('ArticleController', () => {
  let controller: ArticleController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseTestModule],
      controllers: [ArticleController],
      providers: [ArticleService, ...articleProviders],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
