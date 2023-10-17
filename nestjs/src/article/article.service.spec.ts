import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { articleProviders } from './article.providers';
import { DatabaseTestModule } from '../dababase/database.test.module';

describe('ArticleService', () => {
  let service: ArticleService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseTestModule],
      providers: [ArticleService, ...articleProviders],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
