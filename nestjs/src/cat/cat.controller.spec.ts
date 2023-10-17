import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { catProviders } from './cat.providers';
import { DatabaseTestModule } from '../dababase/database.test.module';

describe('CatController', () => {
  let catsController: CatController;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [DatabaseTestModule],
      controllers: [CatController],
      providers: [CatService, ...catProviders],
    }).compile();

    catsController = app.get(CatController);
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
