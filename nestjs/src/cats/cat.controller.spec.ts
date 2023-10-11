import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';
import { DATABASE_CONNECTION } from '../const';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('CatsController', () => {
  let catsController: CatsController;
  let mongo: MongoMemoryServer;

  beforeEach(async () => {
    mongo = await MongoMemoryServer.create();
    const connection = await mongoose.connect(mongo.getUri());
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        ...catsProviders,
        {
          provide: DATABASE_CONNECTION,
          useValue: connection,
        },
      ],
    }).compile();

    catsController = app.get(CatsController);
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongo.stop();
  });

  describe('root', () => {
    it('find all lenght must >= 0', async () => {
      expect((await catsController.findAll()).length).toBeGreaterThanOrEqual(0);
    });
  });
});
