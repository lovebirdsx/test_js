import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';
import { DatabaseTestModule } from '../dababase/database.test.module';

describe('CatsController', () => {
  let catsController: CatsController;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [DatabaseTestModule],
      controllers: [CatsController],
      providers: [CatsService, ...catsProviders],
    }).compile();

    catsController = app.get(CatsController);
  });

  afterEach(async () => {
    // 正确释放DatabaseTestModule中的资源(触发：MemoryDatabaseService.onModuleDestroy)
    await app.close();
  });

  describe('root', () => {
    it('find all lenght must >= 0', async () => {
      expect((await catsController.findAll()).length).toBeGreaterThanOrEqual(0);
    });
  });
});
